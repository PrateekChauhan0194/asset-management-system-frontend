import React from 'react';
import { getBorrowers } from '../../services/APIComms';
import { API_HOST } from '../../config';
import { toast } from 'react-toastify';

const EditLoanCard = ({ borrower, setBorrowers }) => {

    const [rank, setRank] = React.useState(borrower.rank);
    const [fullName, setFullName] = React.useState(borrower.fullName);
    const [serviceNumber, setServiceNumber] = React.useState(borrower.serviceNumber);
    const [department, setDepartment] = React.useState(borrower.department);

    const getRankValue = () => document.getElementById(`editRank-${borrower._id}`).value;
    const getFullNameValue = () => document.getElementById(`editFullName-${borrower._id}`).value;
    const getServiceNumberValue = () => (document.getElementById(`editServiceNumber-${borrower._id}`).value).trim();
    const getDepartmentValue = () => document.getElementById(`editDepartment-${borrower._id}`).value;

    const onChange = async (e) => {
        setRank(getRankValue());
        setFullName(getFullNameValue());
        setServiceNumber(getServiceNumberValue());
        setDepartment(getDepartmentValue());
    };

    const updateBorrower = async () => {
        const loanedItems = await getLoanedItems(borrower.serviceNumber);

        // Update all the found items' service number property to the new service number
        loanedItems.forEach(async (item) => {
            await fetch(`${API_HOST}/api/v1/item/updateItem/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceNumber: 'inventory',
                    name: item.name,
                    serialNumber: item.serialNumber,
                    model: item.model,
                    gigNumber: item.gigNumber,
                }),
            });
        });

        // Update the borrower's service number property to the new service number
        const response = await fetch(`${API_HOST}/api/v1/borrower/update/${borrower._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serviceNumber,
                rank,
                fullName,
                department,
            }),
        });
        const data = await response.json();
        if (!data.errors) {
            toast.success('Loan card updated successfully.');
            setBorrowers(await getBorrowers());

            loanedItems.forEach(async (item) => {
                await fetch(`${API_HOST}/api/v1/item/updateItem/${item._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        serviceNumber: serviceNumber,
                        name: item.name,
                        serialNumber: item.serialNumber,
                        model: item.model,
                        gigNumber: item.gigNumber,
                    }),
                });
            });
        } else {
            loanedItems.forEach(async (item) => {
                await fetch(`${API_HOST}/api/v1/item/updateItem/${item._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        serviceNumber: borrower.serviceNumber,
                        name: item.name,
                        serialNumber: item.serialNumber,
                        model: item.model,
                        gigNumber: item.gigNumber,
                    }),
                });
            });
            toast.error(data.errors[0].msg);
        }
    };

    const getLoanedItems = async (serviceNumber) => {
        const response = await fetch(`${API_HOST}/api/v1/item/getItems/${serviceNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': localStorage.getItem('auth_token'),
            },
        });
        const data = await response.json();
        if (!data.errors) {
            return data;
        }
    };

    return (
        <>
            <div className='modal fade' id={`edit-borrower-modal-${borrower._id}`} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='edit-borrower-modal_title'>Edit Loan Card</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <form className='row my-3 needs-validation' >
                                <div className='mb-3 col-sm-6'>
                                    <label htmlFor='editRank' className='form-label'>Rank</label>
                                    <input type='text' className='form-control' id={`editRank-${borrower._id}`} name='rank' aria-describedby='editRank' value={rank} onChange={onChange} required />
                                </div>
                                <div className='mb-3 col-sm-6'>
                                    <label htmlFor='editFullName' className='form-label'>Full Name</label>
                                    <input type='text' className='form-control' id={`editFullName-${borrower._id}`} name='fullName' value={fullName} onChange={onChange} required />
                                </div>
                                <div className='mb-3 col-sm-6'>
                                    <label htmlFor='editServiceNumber' className='form-label'>Service Number</label>
                                    <input type='text' className='form-control' id={`editServiceNumber-${borrower._id}`} name='serviceNumber' value={serviceNumber} onChange={onChange} required />
                                </div>
                                <div className='mb-3 col-sm-6'>
                                    <label htmlFor='editDepartment' className='form-label'>Department</label>
                                    <input type='text' className='form-control' id={`editDepartment-${borrower._id}`} name='department' value={department} onChange={onChange} required />
                                </div>
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary' data-bs-dismiss='modal' onClick={updateBorrower}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditLoanCard
