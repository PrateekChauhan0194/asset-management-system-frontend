import React, { useState } from 'react';
import { FormControl, Input, InputLabel, Button } from '@mui/material';

const EditItem = (props) => {
    // const { name, serialNumber, model, gigNumber } = props.item;

    const [name, setName] = useState(props.item.name);
    const [serialNumber, setSerialNumber] = useState(props.item.serialNumber);
    const [model, setModel] = useState(props.item.model);
    const [gigNumber, setGigNumber] = useState(props.item.gigNumber);

    return <>
        <div className='modal fade' id={`edit-item-${props.item._id}`} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id={`edit-item_title_${props.item._id}`}>Edit item</h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => {
                            setName(props.item.name);
                            setSerialNumber(props.item.serialNumber);
                            setModel(props.item.model);
                            setGigNumber(props.item.gigNumber);
                        }} />
                    </div>
                    <div className='modal-body'>
                        <form className='row my-3' >
                            <div className="form-group mb-4">
                                <FormControl fullWidth className='my-2'>
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <Input
                                        aria-describedby="text-name"
                                        id={`text-name-${props.item._id}`}
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)} />
                                </FormControl>
                                <FormControl fullWidth className='my-2'>
                                    <InputLabel htmlFor="serial-number">Serial number</InputLabel>
                                    <Input
                                        aria-describedby="text-serial-number"
                                        id={`text-serial-number-${props.item._id}`}
                                        type="text"
                                        value={serialNumber}
                                        onChange={e => setSerialNumber(e.target.value)} />
                                </FormControl>
                                <FormControl fullWidth className='my-2'>
                                    <InputLabel htmlFor="model">Model</InputLabel>
                                    <Input
                                        aria-describedby="text-model"
                                        id={`text-model-${props.item._id}`}
                                        type="text"
                                        value={model}
                                        onChange={e => setModel(e.target.value)} />
                                </FormControl>
                                <FormControl fullWidth className='my-2'>
                                    <InputLabel htmlFor="gig-number">Gig number</InputLabel>
                                    <Input
                                        aria-describedby="text-gig-number"
                                        id={`text-gig-number-${props.item._id}`}
                                        type="text"
                                        value={gigNumber}
                                        onChange={e => setGigNumber(e.target.value)} />
                                </FormControl>
                            </div>
                            <div className='modal-footer pb-0'>
                                <Button variant="contained" type="submit" color="primary" data-bs-dismiss='modal' >Edit item</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default EditItem;
