import './LoanedItems.css';
import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { API_HOST } from '../../config';
import { toast } from 'react-toastify';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import PrintIcon from '@mui/icons-material/Print';
import { parse } from 'node-html-parser';

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
                const response = await fetch(`${API_HOST}/api/v1/item/issueItem/${id}`, {
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
                        issueDate: new Date().toISOString(),
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

    const handlePrint = async () => {
        const date = new Date();
        const strDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        const printContainer = parse(document.querySelector(`#view-loaned-items-${borrower._id} .modal-body`).innerHTML);
        // Remove all the svg elements from the print container
        const svgElements = printContainer.querySelectorAll('svg');
        svgElements.forEach((svg) => {
            svg.remove();
        });
        const printContents = printContainer.outerHTML.replace('Return to inventory', '');

        // const printContents = document.querySelector(`#view-loaned-items-${borrower._id} .modal-body`).innerHTML;
        const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
            <html>
                <head>
                    <title>Loan card - ${borrower.serviceNumber}</title>
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
                        <h2 style="text-align: center;">Loan card - ${strDate}</h2>
                        <hr/>
                        <h3>Number of loaned items: ${loanedItems.length}</h3>
                        <h3>Service number: ${borrower.serviceNumber}</h3>
                        <h3>Rank: ${borrower.rank}</h3>
                        <h3>Name: ${borrower.fullName}</h3>
                        <h3>Department: ${borrower.department}</h3>
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
            <div className='modal fade' id={`view-loaned-items-${borrower._id}`} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered modal-xl'>
                    <div className='modal-content view-loaned-items'>
                        <div className='modal-header'>
                            <h5
                                className='modal-title'
                                id='edit-borrower-modal_title'>
                                <b>Loaned items</b> - {borrower.rank} {borrower.fullName} <span className='heading-service-number'>[{borrower.serviceNumber}] </span>
                                <button className="btn btn-sm btn-outline-secondary" onClick={handlePrint}><PrintIcon /> Print</button>
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
                                            <th>Item model</th>
                                            <th>Item serial number</th>
                                            <th>Issue date</th>
                                            <th>Return to inventory</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loanedItems.map(loanedItem => (
                                            <tr key={loanedItem._id}>
                                                <td>{loanedItem.gigNumber}</td>
                                                <td>{loanedItem.name}</td>
                                                <td>{loanedItem.model}</td>
                                                <td>{loanedItem.serialNumber}</td>
                                                <td>{new Date(loanedItem.issueDate).toDateString()}</td>
                                                <td className='btn-return'><Tooltip title='Return item' placement='right' TransitionComponent={Zoom}><SettingsBackupRestoreIcon onClick={() => returnItem(loanedItem._id)} /></Tooltip></td>
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
