import React from 'react';
import PrintIcon from '@mui/icons-material/Print';
import { Typography } from '@mui/material';
import { parse } from 'node-html-parser';

const AllBorrowers = ({ borrowers }) => {
    const hasBorrowers = borrowers.length > 0;

    const handlePrint = async () => {
        const date = new Date();
        const strDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        const printContents = parse(document.querySelector(`#view-borrowers .modal-body`).innerHTML);

        const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
            <html>
                <head>
                    <title>Loan card holders</title>
                    <style>
                        @media print {
                            @page {
                                margin-top: 0mm;
                            }
                            .page-break {
                                page-break-after: always;
                            }
                        }
                        table, th, td {
                            text-align: left;
                            border: 1px solid black;
                            border-collapse: collapse;
                        }
                        th, td {
                            padding: 5px;
                        }
                    </style>
                </head>
                <body onload="window.print();window.close()">
                        <hr/>
                        <h2 style="text-align: center;">Loan card holders - ${strDate}</h2>
                        <hr/>
                        <h3>Number of borrowers: ${borrowers.length}</h3>
                        <hr/>
                        <div>${printContents}</div>
                        <hr/>
                </body>
            </html>
        `);
        popupWin.document.close();
    };

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
                                <button className="btn btn-sm btn-outline-secondary m-2" onClick={handlePrint}><PrintIcon /> Print</button>
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
