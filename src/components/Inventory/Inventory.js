import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import AddToInventory from '../AddToInventory/AddToInventory';
import { getInventoryItems } from '../../services/APIComms';
import { Typography } from '@mui/material';
import { API_HOST } from '../../config';

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    // eslint-disable-next-line
    useEffect(async () => {
        setInventoryItems(await getInventoryItems());
        // eslint-disable-next-line
    }, []);

    const deleteItem = async (id) => {
        // eslint-disable-next-line
        const action = confirm('Are you sure you want to delete this item?');
        if (action) {
            const response = await fetch(`${API_HOST}/api/v1/item/deleteItem/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!data.errors) {
                setInventoryItems(await getInventoryItems());
            }
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
                                    <th scope="col">Data Creation Date</th>
                                    <th scope="col">Delete</th>
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
