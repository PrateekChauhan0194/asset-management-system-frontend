import './Login.css';
import React from 'react';

const doLogin = (e) => {
    e.preventDefault();
    console.log('doLogin');
}

const Login = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card card-body">
                        <h3 className="text-center mb-4">Asset management system - Login</h3>
                        <form>
                            <div className="form-group my-3">
                                <label>Username</label>
                                <input type="email" className="form-control" placeholder="Enter username" />
                            </div>
                            <div className="form-group my-3">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" onClick={doLogin}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login