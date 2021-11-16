import './AddLoanCard.css';
import React from 'react';
import { API_HOST } from '../../config';
import { toast } from 'react-toastify';

const AddLoanCard = ({ setBorrowers }) => {
    const addNewLoanCard = async (e) => {
        e.preventDefault();

        // Call /add post endpoint to add a new borrower    
        const response = await fetch(`${API_HOST}/api/v1/borrower/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serviceNumber: document.getElementById('form-add-loan-card--text-service-number').value,
                rank: document.getElementById('form-add-loan-card--text-rank').value,
                fullName: document.getElementById('form-add-loan-card--text-full-name').value,
                department: document.getElementById('form-add-loan-card--text-department').value,
            }),
        });
        const data = await response.json();
        if (!data.errors) {
            const response = await fetch(`${API_HOST}/api/v1/borrower/getAll`);
            const data = await response.json();
            setBorrowers(data);
        } else {
            data.errors.forEach((error) => {
                toast.error(error.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: 5000,
                });
            });
        }
        console.log(data);
    }

    return (
        <div className="container">
            <div className="container-add-loan-card">
                <h1 className="title-add-loan-card my-5">Add new loan card</h1>
                <div className="container-add-loan-card-form">
                    <form className="form-add-loan-card">
                        <div className="form-group">
                            <label htmlFor="name">Service Number</label>
                            <input type="text" className="form-control" id="form-add-loan-card--text-service-number" placeholder="Enter service number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Rank</label>
                            <input type="text" className="form-control" id="form-add-loan-card--text-rank" placeholder="Enter rank" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" className="form-control" id="form-add-loan-card--text-full-name" placeholder="Enter full name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Department</label>
                            <input type="text" className="form-control" id="form-add-loan-card--text-department" placeholder="Enter department" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg mt-3" onClick={addNewLoanCard}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddLoanCard
