import { Typography } from '@mui/material';
import React from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <div className="container">
                    <Typography variant="h2" gutterBottom className='mt-5'>Dashboard</Typography>
                    <Typography variant="h3" gutterBottom className='mt-5'>Total Assets</Typography>
                    Total owned assets: ___ <br />
                    Item breakup based on name

                    <br />
                    <br />

                    <Typography variant="h3" gutterBottom className='mt-5'>Assets in Inventory</Typography>
                    Total assets in inventory: ___ <br />
                    Item breakup based on name

                    <br />
                    <br />

                    <Typography variant="h3" gutterBottom className='mt-5'>Loaned Assets</Typography>
                    Total loaned assets: ___ <br />
                    Item breakup based on name
                    <br />
                    <br />

                    <Typography variant="h3" gutterBottom className='mt-5'>Defects</Typography>
                    Should not issue item if the loan card with entered service number does not exist <br />
                    Error while trying to edit the loan card with no change.
                    <br />
                </div>
            </>
        ) : (
            window.location.href = '/'
        )
    )
}

export default Dashboard