import React from 'react';
import { FormControl, InputLabel, Input, Button, Typography } from '@mui/material';
import { API_HOST } from '../../config';
import { getInventoryItems } from '../../services/APIComms';
import { toast } from 'react-toastify';

const AddToInventory = ({ setInventoryItems }) => {
    const addItemToInventory = async (e) => {
        e.preventDefault();

        // Call /addItem post endpoint to add a new item to the inventory
        const response = await fetch(`${API_HOST}/api/v1/item/addItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serviceNumber: 'inventory',
                name: document.getElementById('form-add-to-inventory--text-item-name').value,
                serialNumber: document.getElementById('form-add-to-inventory--text-item-serial-number').value,
                model: document.getElementById('form-add-to-inventory--text-item-model').value,
                gigNumber: document.getElementById('form-add-to-inventory--text-item-gig-number').value,
                issueDate: new Date().toISOString(),
            }),
        });

        const data = await response.json();
        // console.log(data);
        if (!data.errors) {
            setInventoryItems(await getInventoryItems());
            toast.success('Item added to inventory');
            clearForm();
        } else {
            toast.dismiss();
            setTimeout(() => {
                data.errors.forEach((error) => {
                    toast.error(error.msg);
                });
            }, 200);
        }
    };

    const clearForm = () => {
        document.getElementById('form-add-to-inventory--text-item-name').value = '';
        document.getElementById('form-add-to-inventory--text-item-serial-number').value = '';
        document.getElementById('form-add-to-inventory--text-item-model').value = '';
        document.getElementById('form-add-to-inventory--text-item-gig-number').value = '';
    };

    return (
        <>
            <div className="container container-add-to-inventory">
                <Typography variant="h2" className="title-add-loan-card my-5">
                    Add item to inventory
                </Typography>

                <div className="add-to-inventory-form-container">
                    <form className="form-add-to-inventory">
                        <div className="form-group my-4">
                            <FormControl fullWidth className='my-2'>
                                <InputLabel htmlFor="item-gig-number">Item GIG Number</InputLabel>
                                <Input id="form-add-to-inventory--text-item-gig-number" aria-describedby="text-item-gig-number" />
                            </FormControl>
                            <FormControl fullWidth className='my-2'>
                                <InputLabel htmlFor="item-name">Item name</InputLabel>
                                <Input id="form-add-to-inventory--text-item-name" aria-describedby="text-item-name" />
                            </FormControl>
                            <FormControl fullWidth className='my-2'>
                                <InputLabel htmlFor="item-serial-number">Item serial number</InputLabel>
                                <Input id="form-add-to-inventory--text-item-serial-number" aria-describedby="text-item-serial-number" />
                            </FormControl>
                            <FormControl fullWidth className='my-2'>
                                <InputLabel htmlFor="item-model">Item model</InputLabel>
                                <Input id="form-add-to-inventory--text-item-model" aria-describedby="text-item-model" />
                            </FormControl>
                        </div>
                        <Button variant="contained" size='large' color="primary" onClick={addItemToInventory}>Add to inventory</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddToInventory
