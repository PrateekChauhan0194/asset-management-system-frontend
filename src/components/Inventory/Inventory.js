import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import AddToInventory from '../AddToInventory/AddToInventory';
import { getInventoryItems } from '../../services/APIComms';
import { Typography } from '@mui/material';

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    // eslint-disable-next-line
    useEffect(async () => {
        setInventoryItems(await getInventoryItems());
        // eslint-disable-next-line
    }, []);

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
                                    </tr>
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
