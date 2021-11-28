import './AddLoanCard.css';
import React from 'react';
import { API_HOST } from '../../config';
import { toast } from 'react-toastify';
import { FormControl, InputLabel, Input, Button, Typography } from '@mui/material';
import { getBorrowers } from '../../services/APIComms';

const AddLoanCard = ({ setBorrowers }) => {

    const handleOnServiceNumberChange = (e) => {
        document.getElementById('form-add-loan-card--text-service-number').value = e.target.value.trim();
    }
    const addNewLoanCard = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API_HOST}/api/v1/borrower/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serviceNumber: (document.getElementById('form-add-loan-card--text-service-number').value).trim(),
                rank: document.getElementById('form-add-loan-card--text-rank').value,
                fullName: document.getElementById('form-add-loan-card--text-full-name').value,
                department: document.getElementById('form-add-loan-card--text-department').value,
            }),
        });
        const data = await response.json();
        if (!data.errors) {
            setBorrowers(await getBorrowers());
            toast.success('Loan card added successfully');
            clearForm();
        } else {
            data.errors.forEach((error) => {
                toast.error(error.msg);
            });
        }
    }

    const clearForm = () => {
        document.getElementById('form-add-loan-card--text-service-number').value = '';
        document.getElementById('form-add-loan-card--text-rank').value = '';
        document.getElementById('form-add-loan-card--text-full-name').value = '';
        document.getElementById('form-add-loan-card--text-department').value = '';
    }

    return (
        <div className="container">
            <div className="container-add-loan-card">
                <Typography variant="h2" className="title-add-loan-card my-5">
                    Add new loan card
                </Typography>
                <div className="container-add-loan-card-form">
                    <form className="form-add-loan-card">
                        <div className="form-group my-4">
                            <FormControl fullWidth>
                                <InputLabel htmlFor="service-number">Service Number</InputLabel>
                                <Input id="form-add-loan-card--text-service-number" aria-describedby="text-service-number" onChange={handleOnServiceNumberChange} />
                            </FormControl>
                        </div>
                        <div className="form-group my-4">
                            <FormControl fullWidth>
                                <InputLabel htmlFor="rank">Rank</InputLabel>
                                <Input id="form-add-loan-card--text-rank" aria-describedby="text-rank" />
                            </FormControl>
                        </div>
                        <div className="form-group my-4">
                            <FormControl fullWidth>
                                <InputLabel htmlFor="full-name">Full Name</InputLabel>
                                <Input id="form-add-loan-card--text-full-name" aria-describedby="text-full-name" />
                            </FormControl>
                        </div>
                        <div className="form-group my-4">
                            <FormControl fullWidth>
                                <InputLabel htmlFor="department">Department</InputLabel>
                                <Input id="form-add-loan-card--text-department" aria-describedby="text-department" />
                            </FormControl>
                        </div>
                        <Button variant="contained" size='large' color="primary" onClick={addNewLoanCard}>Add</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddLoanCard
