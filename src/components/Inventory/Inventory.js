import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import AddToInventory from '../AddToInventory/AddToInventory';
import { getInventoryItems } from '../../services/APIComms';
import { Typography } from '@mui/material';
import { API_HOST } from '../../config';
import { toast } from 'react-toastify';

const Inventory = () => {
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
                }
            }
        } else {
            toast.error('Error in issuing item');
        }
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
                                    <>
                                        <tr key={index}>
                                            <td>{inventoryItem.name}</td>
                                            <td>{inventoryItem.serialNumber}</td>
                                            <td>{inventoryItem.model}</td>
                                            <td>{inventoryItem.gigNumber}</td>
                                            <td>{new Date(inventoryItem.dataCreationDate).toDateString()}</td>
                                            <td><i className="fas fa-trash-alt delete-inventory-item mx-1" onClick={() => deleteItem(inventoryItem._id)} /></td>
                                            <td><i className="fas fa-exchange-alt issue-inventory-item mx-1" onClick={() => issueItem(inventoryItem._id)} /></td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        ) : (
            window.location.href = '/'
        )
    )
}

export default Inventory
