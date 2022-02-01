import React from 'react';
import PrintIcon from '@mui/icons-material/Print';
import { Typography } from '@mui/material';

const AllBorrowers = ({ borrowers }) => {
    const hasBorrowers = borrowers.length > 0;

    return (
        <>
            <div className='modal fade' id='view-borrowers' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered modal-xl'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5
                                className='modal-title'
                                id='view-borrowers-modal_title'>
                                Loan Card holders
                                <button className="btn btn-sm btn-outline-secondary m-2"><PrintIcon /> Print</button>
                            </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            {hasBorrowers ? (
                                <table className='table table-striped table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Service number</th>
                                            <th>Rank</th>
                                            <th>Name</th>
                                            <th>Department</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {borrowers.map(borrower => (
                                            <tr key={borrower._id}>
                                                <td>{borrower.serviceNumber}</td>
                                                <td>{borrower.rank}</td>
                                                <td>{borrower.fullName}</td>
                                                <td>{borrower.department}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className='no-borrowers'>
                                    <Typography variant="h5">
                                        No borrowers found
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AllBorrowers;
