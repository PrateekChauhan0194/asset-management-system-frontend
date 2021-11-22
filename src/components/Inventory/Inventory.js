import React from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';

const Inventory = () => {
    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <div className="container">
                    Inventory works!
                </div>
            </>
        ) : (
            window.location.href = '/'
        )
    )
}

export default Inventory
