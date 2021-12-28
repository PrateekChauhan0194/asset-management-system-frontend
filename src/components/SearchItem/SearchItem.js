import React from 'react';
import { useNavigate } from 'react-router';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';

const SearchItem = () => {
    const navigate = useNavigate();

    return (
        isLoggedIn() ? (
            <>
                <Navbar />
            </>
        ) : (
            navigate('/')
        )
    )
}

export default SearchItem
