import './Login.css';
import React from 'react';
import { login } from '../../services/AuthService';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const Login = () => {
    const navigate = useNavigate();

    const doLogin = async () => {
        const username = document.getElementsByName('username')[0].value;
        const password = document.getElementsByName('password')[0].value;
        await login(username, password) && navigate('/dashboard');
        toast.dismiss();
        setTimeout(() => toast.success('Login successful, Welcome!'), 500);
    }


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
                                <button type="submit" className="btn btn-primary btn-block" onClick={async (e) => {
                                    e.preventDefault();
                                    await doLogin();
                                }}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login