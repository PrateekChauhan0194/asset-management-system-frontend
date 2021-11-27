import './Signup.css';
import React from 'react';

const Signup = () => {
    const handleSignup = async (e) => {
        e.preventDefault();
    }
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
                                    <label>Re-enter password</label>
                                    <input type="password" name='signup-re-password' className="form-control" placeholder="Enter password" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary btn-block" onClick={handleSignup}>Signup</button>
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
