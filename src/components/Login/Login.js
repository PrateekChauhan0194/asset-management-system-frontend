import './Login.css';
import React from 'react';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import { login, logout } from '../../services/AuthService';

const doLogin = async (e) => {
    e.preventDefault();

    const username = document.getElementsByName('username')[0].value;
    const password = document.getElementsByName('password')[0].value;

    const securePassword = await bcrypt.hash('A$$etSecPass', bcrypt.genSaltSync(10));
    const isPasswordCorrect = await bcrypt.compare(password, securePassword);
    if (isPasswordCorrect && username === 'admin') {
        console.log('Login successful!');
        login();
        window.location.href = '/dashboard';
    } else {
        toast.error('Incorrect username or password!', {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true
        });
        logout();
    }
}

const Login = () => {
    logout();
    return (
        <>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card card-body">
                            <h3 className="text-center mb-4">Asset management system - Login</h3>
                            <form>
                                <div className="form-group my-3">
                                    <label>Username</label>
                                    <input type="text" className="form-control" name="username" placeholder="Enter username" />
                                </div>
                                <div className="form-group my-3">
                                    <label>Password</label>
                                    <input type="password" name='password' className="form-control" placeholder="Enter password" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" onClick={doLogin}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login