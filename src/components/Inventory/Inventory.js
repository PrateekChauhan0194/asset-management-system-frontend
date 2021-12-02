import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import AddToInventory from '../AddToInventory/AddToInventory';
import { getInventoryItems } from '../../services/APIComms';
import { Typography } from '@mui/material';
import { API_HOST } from '../../config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PrintIcon from '@mui/icons-material/Print';
import { parse } from 'node-html-parser';

const Inventory = () => {
    const navigate = useNavigate();

    const [inventoryItems, setInventoryItems] = useState([]);
    // eslint-disable-next-line
    useEffect(async () => {
        setInventoryItems(await getInventoryItems());
        // eslint-disable-next-line
    }, []);

    const deleteItem = async (id) => {
        // eslint-disable-next-line
        const action = confirm('Item will be deleted permanently. Are you sure you want to delete this item?');
        if (action) {
            const response = await fetch(`${API_HOST}/api/v1/item/deleteItem/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!data.errors) {
                toast.success('Item deleted successfully');
                setInventoryItems(await getInventoryItems());
            }
        }
    };

    const issueItem = async (id) => {
        const response = await fetch(`${API_HOST}/api/v1/item/getItem/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const item = await response.json();
        if (!item.errors) {
            const serviceNumber = prompt('Please enter the service number to issue the item');
            if (serviceNumber) {
                const response = await fetch(`${API_HOST}/api/v1/item/updateItem/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        serviceNumber,
                        name: item.name,
                        serialNumber: item.serialNumber,
                        model: item.model,
                        gigNumber: item.gigNumber,
                    }),
                });
                const data = await response.json();
                if (!data.errors) {
                    alert(`Item issued to person with service number ${serviceNumber}`);
                    toast.success('Item issued successfully');
                    setInventoryItems(await getInventoryItems());
                } else {
                    toast.error(data.errors[0].msg);
                }
            }
        } else {
            toast.error('Error in issuing item');
        }
    };

    const handlePrint = async () => {
        const date = new Date();
        const strDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        let printContainer = parse(document.querySelector(`div.container-inventory-item-list div.print-container`).innerHTML);
        // Remove all the svg elements from the print container
        const svgElements = printContainer.querySelectorAll('svg');
        svgElements.forEach((svg) => {
            svg.remove();
        });
        let printContents = printContainer.outerHTML.replace('Delete', '');
        printContents = printContents.replace('Issue item', '');

        const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
            <html>
                <head>
                    <title>Items in inventory</title>
                    <style>
                        @media print {
                            @page {
                                size: landscape;
                                margin-top: 0mm;
                            }
                            .page-break {
                                page-break-after: always;
                            }
                        }
                    </style>
                </head>
                <body onload="window.print();window.close()">
                        <hr/>
                        <h2 style="text-align: center;">IT Inventory - ${strDate}</h2>
                        <hr/>
                        <div>${printContents}</div>
                        <hr/>
                </body>
            </html>
        `);
        popupWin.document.close();
    };

    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <AddToInventory setInventoryItems={setInventoryItems} />
                <div className="container">
                    <div className='container-inventory-item-list'>
                        <Typography variant="h2" className="title-inventory-item-list mt-5">
                            Your inventory
                        </Typography>
                        <div className="header d-flex justify-content-end">
                            <button className="btn btn-outline-secondary" onClick={handlePrint}><PrintIcon /> Print</button>
                        </div>

                        <div className="print-container">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Serial Number</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Gig Number</th>
                                        <th scope="col">Added or Returned on</th>
                                        <th scope="col">Delete</th>
                                        <th scope="col">Issue item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventoryItems.map((inventoryItem, index) => (
                                        <tr key={index}>
                                            <td>{inventoryItem.name}</td>
                                            <td>{inventoryItem.serialNumber}</td>
                                            <td>{inventoryItem.model}</td>
                                            <td>{inventoryItem.gigNumber}</td>
                                            <td>{new Date(inventoryItem.dataCreationDate).toDateString()}</td>
                                            <td className='btn-delete-inventory-item'><DeleteIcon onClick={() => deleteItem(inventoryItem._id)} /></td>
                                            <td className='btn-issue-inventory-item'><DoubleArrowIcon onClick={() => issueItem(inventoryItem._id)} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            navigate('/')
        )
    )
}

export default Inventory
