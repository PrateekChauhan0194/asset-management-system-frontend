import './LoanCards.css';
import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import { API_HOST } from '../../config';

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
        console.log(data);
        return data;
    }

    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <div className="container">
                    <table className="table table-striped mt-5">
                        <thead>
                            <tr>
                                <th>Service Number</th>
                                <th>Rank</th>
                                <th>Full Name</th>
                                <th>Department</th>
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
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        ) : (
            window.location.href = '/'
        )
    )
}

export default LoanCards
