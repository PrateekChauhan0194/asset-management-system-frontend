import './LoanCards.css';
import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import AddLoanCard from '../AddLoanCard/AddLoanCard';
import { Typography } from '@mui/material';
import LoanCard from '../LoanCard/LoanCard';
import { getBorrowers } from '../../services/APIComms';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AllBorrowers from '../AllBorrowers/AllBorrowers';

const LoanCards = () => {
    const navigate = useNavigate();

    const [borrowers, setBorrowers] = useState([])
    // eslint-disable-next-line
    useEffect(async () => {
        const data = await getBorrowers();
        if (!data.error) {
            setBorrowers(data);
        } else {
            toast.info('Login to continue');
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);

    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <AddLoanCard setBorrowers={setBorrowers} />
                <AllBorrowers borrowers={borrowers} />
                <div className="container">
                    <div className='container-loan-cards-list'>
                        <Typography variant="h2" className="title-loan-cards-list mt-5">
                            Loan cards
                        </Typography>
                        <button className="btn btn-sm btn-outline-secondary mb-4" data-bs-toggle='modal' data-bs-target='#view-borrowers'><FormatListNumberedIcon /> View All borrowers</button>

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
            navigate('/')
        )
    )
}

export default LoanCards
