import './LoanCard.css';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Tooltip } from '@mui/material';
import { API_HOST } from '../../config';
import { toast } from 'react-toastify';
import { getBorrowers } from '../../services/APIComms';
import EditLoanCard from '../EditLoanCard/EditLoanCard';

const LoanCard = (props) => {

    const deleteBorrower = async (id) => {
        // eslint-disable-next-line
        const action = confirm('Loan card will be deleted permanently. Are you sure you want to delete?');
        if (action) {
            const response = await fetch(`${API_HOST}/api/v1/borrower/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!data.errors) {
                toast.success(data.msg);
                props.setBorrowers(await getBorrowers());
            } else {
                toast.error(data.errors[0].msg);
            }
        }
    }

    const setEditLoanCardModalTest = () => {
        const rank = props.borrower.rank;
        const name = props.borrower.fullName;
        const serviceNumber = props.borrower.serviceNumber;
        const department = props.borrower.department;

        document.getElementById(`editRank-${props.borrower._id}`).value = rank;
        document.getElementById(`editFullName-${props.borrower._id}`).value = name;
        document.getElementById(`editServiceNumber-${props.borrower._id}`).value = serviceNumber;
        document.getElementById(`editDepartment-${props.borrower._id}`).value = department;
    }

    return (
        <>
            <EditLoanCard borrower={props.borrower} setBorrowers={props.setBorrowers} />
            <Card text='dark' className='m-2 loan-card' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.borrower.rank} {props.borrower.fullName}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>Service No: {props.borrower.serviceNumber}</Card.Subtitle>
                    <Card.Text>Section: {props.borrower.department}</Card.Text>
                    <div className='controls my-2 d-flex justify-content-end'>
                        <Tooltip title="View"><i className="fas fa-eye mx-1" /></Tooltip>
                        <Tooltip title="Edit"><i className="fas fa-edit mx-1" data-bs-toggle='modal' data-bs-target={`#edit-borrower-modal-${props.borrower._id}`} onClick={setEditLoanCardModalTest} /></Tooltip>
                        <Tooltip title="Delete"><i className="fas fa-trash-alt delete-loan-card mx-1" onClick={() => deleteBorrower(props.borrower._id)} /></Tooltip>
                    </div>
                    <Card.Footer><small><b>Created on:</b> {new Date(props.borrower.dataCreationDate).toDateString()}</small></Card.Footer>
                </Card.Body>
            </Card>
        </>
    )
}

export default LoanCard
