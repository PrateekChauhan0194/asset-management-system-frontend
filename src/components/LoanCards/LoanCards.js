import './LoanCards.css';
import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import { API_HOST } from '../../config';
import AddLoanCard from '../AddLoanCard/AddLoanCard';
import { Typography, Tooltip } from '@mui/material';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const LoanCards = () => {

    const [borrowers, setBorrowers] = useState([])
    // eslint-disable-next-line
    useEffect(async () => {
        setBorrowers(await getBorrowers());
        // eslint-disable-next-line
    }, []);

    const getBorrowers = async () => {
        const response = await fetch(`${API_HOST}/api/v1/borrower/getAll`);
        const data = await response.json();
        return data;
    }

    const deleteBorrower = async (id) => {
        const response = await fetch(`${API_HOST}/api/v1/borrower/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
        if (!data.errors) {
            toast.success(data.msg);
            setBorrowers(await getBorrowers());
        } else {
            toast.error(data.errors[0].msg);
        }
    }

    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <AddLoanCard setBorrowers={setBorrowers} />
                <div className="container">
                    <div className='container-loan-cards-list'>
                        <Typography variant="h2" className="title-loan-cards-list mt-5">
                            Loan cards
                        </Typography>

                        <div className="container-loan-cards-list-cards">
                            {
                                borrowers.map((borrower, index) => {
                                    return (
                                        <Card text='dark' className='m-2 loan-card' style={{ width: '18rem' }} key={index}>
                                            <Card.Body>
                                                <Card.Title>{borrower.rank} {borrower.fullName}</Card.Title>
                                                <Card.Subtitle className='mb-2 text-muted'>Service No: {borrower.serviceNumber}</Card.Subtitle>
                                                <Card.Text>Section: {borrower.department}</Card.Text>
                                                <div className='controls my-2 d-flex justify-content-end'>
                                                    <Tooltip title="View"><i className="fas fa-eye mx-1"></i></Tooltip>
                                                    <Tooltip title="Edit"><i className="fas fa-edit mx-1"></i></Tooltip>
                                                    <Tooltip title="Delete"><i className="fas fa-trash-alt delete-loan-card mx-1" onClick={() => deleteBorrower(borrower._id)} /></Tooltip>
                                                    {/* <i className='far fa-edit mx-2' data-bs-toggle='modal' data-bs-target='#edit-note-modal' /> */}
                                                </div>
                                                <Card.Footer><small><b>Created on:</b> {new Date(borrower.dataCreationDate).toDateString()}</small></Card.Footer>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        ) : (
            window.location.href = '/'
        )
    )
}

export default LoanCards
