import './Landing.css';
import React, { useEffect } from 'react';
import Login from '../Login/Login';
import { API_HOST } from '../../config';
import Signup from '../Signup/Signup';

const LandingPage = () => {
    const [userExists, setUserExists] = React.useState(false);
    const checkUserExists = async () => {
        const response = await fetch(`${API_HOST}/api/v1/auth/check`);
        const data = await response.json();
        setUserExists(data.userExists);
    }

    // eslint-disable-next-line
    useEffect(async () => {
        await checkUserExists();
        // eslint-disable-next-line
    }, []);

    return (
        userExists ? (
            <Login />
        ) : (
            <Signup />
        )
    );
}

export default LandingPage
