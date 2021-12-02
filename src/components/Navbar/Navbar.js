import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/AuthService';
import { useNavigate } from 'react-router';

const isDashboard = () => {
    return window.location.pathname === '/dashboard';
}

const isInventory = () => {
    return window.location.pathname === '/inventory';
}

const isLoanCards = () => {
    return window.location.pathname === '/loan-cards';
}


const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/dashboard">Asset Management System</Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${isDashboard() && 'active'}`} aria-current="page" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isInventory() && 'active'}`} to="/inventory">Inventory</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isLoanCards() && 'active'}`} to="/loan-cards">Loan cards</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            {/* eslint-disable-next-line */}
                            <a className="btn btn-outline-success mx-2" data-bs-toggle='modal' data-bs-target='#change-password'>Change password</a>
                            <button className="btn btn-outline-danger" onClick={() => {
                                logout();
                                navigate('/');
                            }}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
