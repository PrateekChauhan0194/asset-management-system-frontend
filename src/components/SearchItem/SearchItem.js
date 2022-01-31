import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Typography, FormControl, InputLabel, Input, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import { API_HOST } from '../../config';

const SearchItem = () => {
    // eslint-disable-next-line
    useEffect(async () => {
        if (! await isLoggedIn()) {
            toast.info('Login to continue');
            navigate('/');
        }
        // eslint-disable-next-line
    }, [])

    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [borrower, setBorrower] = useState(null);
    const [enteredSerialNumber, setEnteredSerialNumber] = useState('');

    const isItemLoaned = () => {
        if (item.serviceNumber === 'inventory') {
            return false;
        }
        return true;
    }

    const handleSearch = async (e) => {
        e.preventDefault();

        let serialNumber = enteredSerialNumber.toUpperCase();
        // serialNumber.includes('/') && (serialNumber = serialNumber.replace('/', '%252F'));
        if (serialNumber.includes('/')) {
            serialNumber = serialNumber.replace('/', '%2F');
        }

        // API call to get item with the entered serial number
        const response = await fetch(`${API_HOST}/api/v1/item/getItemBySerialNumber/${serialNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': localStorage.getItem('auth_token')
            }
        });
        const data = await response.json();
        if (data != null) {
            toast.success('Item found');
            if (data.serviceNumber !== 'inventory') {
                await getBorrower(data.serviceNumber);
            }
            setItem(data);
        } else {
            toast.error('Item not found');
            setItem(null);
        }
    }

    const getBorrower = async (serviceNumber) => {
        // API call to get borrower of the item
        const response = await fetch(`${API_HOST}/api/v1/borrower/getByServiceNumber/${serviceNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': localStorage.getItem('auth_token')
            }
        });
        const data = await response.json();
        if (response.status === 200) {
            setBorrower(data);
        } else {
            toast.error(data.msg);
        }
    }

    const handleClear = (e) => {
        e.preventDefault();
        setEnteredSerialNumber('');
        setItem(null);
        setBorrower(null);
    }

    const handleKeyPressSubmit = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }

    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <div className="container container-search-item">
                    <Typography variant="h2" className="title-search-item my-5">
                        Search item
                    </Typography>
                    <div className="form-search-item">
                        <div className="form-group my-4">
                            <FormControl fullWidth className='my-2'>
                                <InputLabel htmlFor="item-serial-number">Enter serial number</InputLabel>
                                <Input id="form-search-item--text-item-serial-number" aria-describedby="text-item-serial-number" value={enteredSerialNumber}
                                    onChange={(e) => { setEnteredSerialNumber(e.target.value); }} />
                            </FormControl>
                        </div>
                        <Button variant="contained" size='medium' color="primary" onClick={handleSearch} onSubmit={e => { e.preventDefault(); }} onKeyPress={handleKeyPressSubmit}>Search</Button>
                        <Button variant="contained" size='medium' color="secondary" className='mx-3' onClick={handleClear} onSubmit={e => { e.preventDefault(); }}>Clear</Button>
                    </div>
                </div>

                <div className="container container-found-item">
                    {
                        item ? (
                            <>
                                <Typography variant="h2" className="title-found-item my-5">
                                    Found item
                                </Typography>
                                <div className="found-item">
                                    <div className="found-item-info">
                                        <Typography variant="h6" className="title-found-item-info">
                                            <strong>Item name:</strong> {item.name}
                                        </Typography>
                                        <Typography variant="h6" className="title-found-item-info">
                                            <strong>Serial Number:</strong> {item.serialNumber}
                                        </Typography>
                                        <Typography variant="h6" className="title-found-item-info">
                                            <strong>Model:</strong> {item.model}
                                        </Typography>
                                        <Typography variant="h6" className="title-found-item-info">
                                            <strong>GIG Number:</strong> {item.gigNumber}
                                        </Typography>
                                        <Typography variant="h6" className="title-found-item-info">
                                            <strong>Is Item Loaned:</strong> {isItemLoaned() ? 'Yes' : 'No'}
                                        </Typography>
                                        <Typography variant="h6" className="title-found-item-info">
                                            <strong>Item location:</strong> {isItemLoaned() ? `Loaned to ${borrower.rank} ${borrower.fullName} [${borrower.serviceNumber}]` : `In Inventory`}
                                        </Typography>
                                        <Typography variant="h6" className="title-found-item-info">
                                            <strong>{isItemLoaned() ? 'Issued on' : 'Added on'}:</strong> {new Date(item.issueDate).toDateString()}
                                        </Typography>
                                    </div>
                                </div>
                            </>
                        ) : null
                    }
                </div>
            </>
        ) : (
            navigate('/')
        )
    )
}

export default SearchItem
