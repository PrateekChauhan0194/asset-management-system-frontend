import './Signup.css';
import React from 'react';
import { toast } from 'react-toastify';
import { API_HOST } from '../../config';
import { useNavigate } from 'react-router';
import { isLoggedIn } from '../../services/AuthService';

const Signup = () => {

    const handleSignup = async () => {

        const username = document.querySelector('div.signup-container input[name="signup-username"]').value;
        const password = document.querySelector('div.signup-container input[name="signup-password"]').value;
        const confirmPassword = document.querySelector('div.signup-container input[name="signup-confirm-password"]').value;

        // Show error toast if passwrod and confirm password do not match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        // Create API call to create user
        const response = await fetch(`${API_HOST}/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            toast.success('User created successfully!');
            const auth_token = data.token;
            localStorage.setItem('auth_token', auth_token);
            await isLoggedIn() && navigate('/dashboard');
        } else {
            toast.error(data.msg);
        }
    }

    const navigate = useNavigate();

    return (
        <>
            <div className="container signup-container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card card-body">
                            <h3 className="text-center mb-4">Asset management system - Signup</h3>
                            <form>
                                <div className="form-group my-3">
                                    <label>Username</label>
                                    <input type="text" className="form-control" name="signup-username" placeholder="Enter username" />
                                </div>
                                <div className="form-group my-3">
                                    <label>Password</label>
                                    <input type="password" name='signup-password' className="form-control" placeholder="Enter password" />
                                </div>
                                <div className="form-group my-3">
                                    <label>Confirm password</label>
                                    <input type="password" name='signup-confirm-password' className="form-control" placeholder="Enter password" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary btn-block" onClick={async (e) => {
                                        e.preventDefault();
                                        await handleSignup();
                                    }}>Signup</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
