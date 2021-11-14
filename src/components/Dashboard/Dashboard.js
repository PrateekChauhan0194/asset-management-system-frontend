import React from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <div className="container">
                    Dashboard works!
                </div>
            </>
        ) : (
            window.location.href = '/'
        )
    )
}

export default Dashboard