import React from 'react';
import { isLoggedIn } from '../../services/AuthService';

const Dashboard = () => {
    return (
        isLoggedIn() ? (
            <div className="container">
                Dashboard works!
            </div>
        ) : (
            window.location.href = '/'
        )
    )
}

export default Dashboard