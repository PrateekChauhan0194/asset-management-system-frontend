import './LoanedItems.css';
import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';

const LoanedItems = ({ borrower, loanedItems }) => {
    const hasLoanedItems = loanedItems.length > 0;
    return (
        <>
            <div className='modal fade' id={`view-loaned-items-${borrower._id}`} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered modal-xl'>
                    <div className='modal-content view-loaned-items'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='edit-borrower-modal_title'><b>Loaned items</b> - {borrower.rank} {borrower.fullName} <span className='heading-service-number'>[{borrower.serviceNumber}]</span></h5>
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
                                                <td className='btn-return'><Tooltip title='Return item' placement='right' TransitionComponent={Zoom}><i className='fas fa-undo-alt' /></Tooltip></td>
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
