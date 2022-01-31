import "react-datetime/css/react-datetime.css";
import { FormControl, Input, InputLabel, Button } from '@mui/material';
import React, { useState } from 'react';
import Datetime from 'react-datetime';
import { API_HOST } from '../../config';
import { toast } from 'react-toastify';
import { getInventoryItems } from '../../services/APIComms';

const IssueItem = (props) => {

    const [date, setDate] = useState(new Date());
    const [serviceNumber, setServiceNumber] = useState('');

    const issueItem = async (e) => {
        e.preventDefault();
        const selectedDate = new Date(date);
        // selectedDate.setDate(selectedDate.getDate() + 1);
        const issueDate = selectedDate.toISOString();

        if (serviceNumber.length === 0) {
            toast.error('Please enter a service number');
            return;
        }

        const response = await fetch(`${API_HOST}/api/v1/item/getItem/${props.item._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const item = await response.json();
        if (!item.errors) {
            const response = await fetch(`${API_HOST}/api/v1/item/issueItem/${props.item._id}`, {
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
                    issueDate,
                }),
            });
            const data = await response.json();
            if (!data.errors) {
                alert(`Item issued to person with service number ${serviceNumber}`);
                toast.success('Item issued successfully');
                props.setInventoryItems(await getInventoryItems());
            } else {
                toast.error(data.errors[0].msg);
            }
        } else {
            toast.error('Error in issuing item');
        }

        setServiceNumber('')
    }

    return (
        <>
            <div className='modal fade' id={`issue-item-${props.item._id}`} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id={`issue-item_title_${props.item._id}`}>Issue item</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => setServiceNumber('')} />
                        </div>
                        <div className='modal-body'>
                            <form className='row my-3' >
                                <div className="form-group mb-4">
                                    <FormControl fullWidth className='my-2'>
                                        <InputLabel htmlFor="service-number">Service number</InputLabel>
                                        <Input
                                            aria-describedby="text-service-number"
                                            id={`text-service-number-${props.item._id}`}
                                            type="text"
                                            value={serviceNumber}
                                            onChange={e => setServiceNumber(e.target.value)} />
                                    </FormControl>
                                    <FormControl fullWidth className='my-2'>
                                        <label htmlFor="date-of-issue">Date of issue</label>
                                        <Datetime
                                            value={date}
                                            onChange={(newDate) => {
                                                setDate(newDate);
                                            }}
                                            initialViewMode='days'
                                            closeOnSelect={true}
                                            dateFormat="DD MMM YYYY"
                                            timeFormat={false}
                                        />
                                    </FormControl>
                                </div>
                                <div className='modal-footer pb-0'>
                                    <Button variant="contained" type="submit" color="primary" data-bs-dismiss='modal' onClick={issueItem}>Issue item</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IssueItem
