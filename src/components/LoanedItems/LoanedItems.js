import './LoanedItems.css';
import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { API_HOST } from '../../config';
import { toast } from 'react-toastify';

const LoanedItems = ({ borrower, loanedItems, setLoanedItems, fetchLoanedItems }) => {
    const hasLoanedItems = loanedItems.length > 0;

    const returnItem = async (id) => {
        const response = await fetch(`${API_HOST}/api/v1/item/getItem/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const item = await response.json();
        if (!item.errors) {
            // eslint-disable-next-line
            const confirmReturn = confirm('This item will be returned to the inventory. Confirm return?');
            if (confirmReturn) {
                const response = await fetch(`${API_HOST}/api/v1/item/updateItem/${id}`, {
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
                const data = await response.json();
                if (!data.errors) {
                    alert('Item returned to the inventory');
                    toast.success('Item returned to the inventory');
                    await fetchLoanedItems(borrower.serviceNumber);
                }
            }
        } else {
            toast.error('Error returning item to the inventory.');
        }
    };

    return (
        <>
            <div className='modal fade' id={`view-loaned-items-${borrower._id}`} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered modal-xl'>
                    <div className='modal-content view-loaned-items'>
                        <div className='modal-header'>
                            <h5
                                className='modal-title'
                                id='edit-borrower-modal_title'>
                                <b>Loaned items</b> - {borrower.rank} {borrower.fullName} <span className='heading-service-number'>[{borrower.serviceNumber}] </span>
                                <button className="btn btn-sm btn-outline-secondary" ><i className="fas fa-print" /> Print</button>
                                {/* onClick={() => window.print()} */}
                            </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            {hasLoanedItems ? (
                                <table className='table table-striped table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>GIG Number</th>
                                            <th>Item name</th>
                                            <th>Item serial number</th>
                                            <th>Item model</th>
                                            <th>Loaned on</th>
                                            <th>Return to inventory</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loanedItems.map(loanedItem => (
                                            <tr key={loanedItem._id}>
                                                <td>{loanedItem.gigNumber}</td>
                                                <td>{loanedItem.name}</td>
                                                <td>{loanedItem.serialNumber}</td>
                                                <td>{loanedItem.model}</td>
                                                <td>{new Date(loanedItem.dataCreationDate).toDateString()}</td>
                                                <td className='btn-return'><Tooltip title='Return item' placement='right' TransitionComponent={Zoom}><i className='fas fa-undo-alt' onClick={() => returnItem(loanedItem._id)} /></Tooltip></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (

                                <div className='no-loaned-items'>
                                    <Typography variant="h5">
                                        No loaned items
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoanedItems
