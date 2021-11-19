import './LoanCards.css';
import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import { API_HOST } from '../../config';
import AddLoanCard from '../AddLoanCard/AddLoanCard';
import { Button, Typography } from '@mui/material';

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
                        <table className="table table-striped mt-5">
                            <thead>
                                <tr>
                                    <th>Service Number</th>
                                    <th>Rank</th>
                                    <th>Full Name</th>
                                    <th>Department</th>
                                    <th>Loaned Assets</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    borrowers.map((borrower, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{borrower.serviceNumber}</td>
                                                <td>{borrower.rank}</td>
                                                <td>{borrower.fullName}</td>
                                                <td>{borrower.department}</td>
                                                <td>
                                                    <Button variant="contained" size="small" color="primary" className="btn-loan-card">
                                                        👁️ View
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
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

export default LoanCards
