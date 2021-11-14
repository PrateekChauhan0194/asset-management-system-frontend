import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/AuthService';

const isDashboard = () => {
    return window.location.pathname === '/dashboard';
}

const isLoanCards = () => {
    return window.location.pathname === '/loan-cards';
}


const Navbar = () => {
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
                                <Link className={`nav-link ${isLoanCards() && 'active'}`} to="/loan-cards">Loan cards</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <button className="btn btn-outline-success" onClick={() => logout()}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
