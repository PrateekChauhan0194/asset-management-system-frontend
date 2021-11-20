import './LoanCards.css';
import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import AddLoanCard from '../AddLoanCard/AddLoanCard';
import { Typography } from '@mui/material';
import LoanCard from '../LoanCard/LoanCard';
import { getBorrowers } from '../../services/APIComms';

const LoanCards = () => {

    const [borrowers, setBorrowers] = useState([])
    // eslint-disable-next-line
    useEffect(async () => {
        setBorrowers(await getBorrowers());
        // eslint-disable-next-line
    }, []);

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
                                        <LoanCard key={index} borrower={borrower} index={index} setBorrowers={setBorrowers} />
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
