import './Dashboard.css';
import { Button, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import { getAllItems } from '../../services/APIComms';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";

const Dashboard = () => {
    const [totalAssets, setTotalAssets] = useState(0);
    const [totalInventoryAssets, setTotalInventoryAssets] = useState(0);
    const [totalLoanedAssets, setTotalLoanedAssets] = useState(0);

    const [totalAssetsData, setTotalAssetsData] = useState(null);
    const [inventoryAssetsData, setInventoryAssetsData] = useState(null);
    const [loanedAssetsData, setLoanedAssetsData] = useState(null);

    const navigate = useNavigate();

    // eslint-disable-next-line
    useEffect(async () => {
        await setItemCounts();
        setTotalAssetsData(await getTotalAssetsData());
        setInventoryAssetsData(await getInventoryAssetsData());
        setLoanedAssetsData(await getLoanedAssetsData());
        await setDownloadData();
        // eslint-disable-next-line
    }, []);

    const setItemCounts = async () => {
        const items = await getAllItems();
        if (items !== false) {
            const inventoryItems = items.filter(item => item.serviceNumber === 'inventory');
            const loanedItems = items.filter(item => item.serviceNumber !== 'inventory');

            setTotalAssets(items.length);
            setTotalInventoryAssets(inventoryItems.length);
            setTotalLoanedAssets(loanedItems.length);
        } else {
            toast.info('Login to continue');
            navigate('/');
        }
    }

    const getTotalAssetsData = async () => {
        const items = await getAllItems();

        if (items !== false) {
            const itemNames = items.map(item => item.name);
            const uniqueItemNames = [...new Set(itemNames)];

            // Get models from the items for each unique item name
            const models = uniqueItemNames.map(async (itemName) => {
                // Get all items with the same name
                const itemsWithSameName = items.filter(item => item.name === itemName);

                // Get all models from the items with the same name
                const models = itemsWithSameName.map(item => item.model);

                // Return all models
                return models;
            });
            // fetch data from array of promises (models)
            const modelsOfEachUniqueItems = await Promise.all(models);

            const data = modelsOfEachUniqueItems.map(element => {
                const uniqueModels = [...new Set(element)];
                const uniqueModelsCount = uniqueModels.map(model => {
                    const count = element.filter(item => item === model).length;
                    return { model, count };
                });
                // Convert uniqueModelsCount to an object in format { model: count }
                const uniqueModelsCountObject = uniqueModelsCount.reduce((acc, curr) => {
                    acc[curr.model] = curr.count;
                    return acc;
                }, {});
                return uniqueModelsCountObject;
            });
            const finalData = await Promise.all(data);

            let totalAssetsData = {};
            for (let i = 0; i < uniqueItemNames.length; i++) {
                const element = uniqueItemNames[i];
                totalAssetsData[element] = finalData[i];
            }
            // console.log('Total');
            // console.log(totalAssetsData);
            return totalAssetsData;
        } else {
            navigate('/');
        }
    };

    const getInventoryAssetsData = async () => {
        let items = await getAllItems();
        if (items !== false) {
            items = items.filter(item => item.serviceNumber === 'inventory');
            const itemNames = items.map(item => item.name);
            const uniqueItemNames = [...new Set(itemNames)];

            // Get models from the items for each unique item name
            const models = uniqueItemNames.map(async (itemName) => {
                // Get all items with the same name
                const itemsWithSameName = items.filter(item => item.name === itemName);

                // Get all models from the items with the same name
                const models = itemsWithSameName.map(item => item.model);

                // Return all models
                return models;
            });
            // fetch data from array of promises (models)
            const modelsOfEachUniqueItems = await Promise.all(models);

            const data = modelsOfEachUniqueItems.map(element => {
                const uniqueModels = [...new Set(element)];
                const uniqueModelsCount = uniqueModels.map(model => {
                    const count = element.filter(item => item === model).length;
                    return { model, count };
                });
                // Convert uniqueModelsCount to an object in format { model: count }
                const uniqueModelsCountObject = uniqueModelsCount.reduce((acc, curr) => {
                    acc[curr.model] = curr.count;
                    return acc;
                }, {});
                return uniqueModelsCountObject;
            });
            const finalData = await Promise.all(data);

            let inventoryAssetsData = {};
            for (let i = 0; i < uniqueItemNames.length; i++) {
                const element = uniqueItemNames[i];
                inventoryAssetsData[element] = finalData[i];
            }
            // console.log('Inventory');
            // console.log(inventoryAssetsData);
            return inventoryAssetsData;
        } else {
            navigate('/');
        }
    }

    const getLoanedAssetsData = async () => {
        let items = await getAllItems();
        if (items !== false) {
            items = items.filter(item => item.serviceNumber !== 'inventory');
            const itemNames = items.map(item => item.name);
            const uniqueItemNames = [...new Set(itemNames)];

            // Get models from the items for each unique item name
            const models = uniqueItemNames.map(async (itemName) => {
                // Get all items with the same name
                const itemsWithSameName = items.filter(item => item.name === itemName);

                // Get all models from the items with the same name
                const models = itemsWithSameName.map(item => item.model);

                // Return all models
                return models;
            });
            // fetch data from array of promises (models)
            const modelsOfEachUniqueItems = await Promise.all(models);

            const data = modelsOfEachUniqueItems.map(element => {
                const uniqueModels = [...new Set(element)];
                const uniqueModelsCount = uniqueModels.map(model => {
                    const count = element.filter(item => item === model).length;
                    return { model, count };
                });
                // Convert uniqueModelsCount to an object in format { model: count }
                const uniqueModelsCountObject = uniqueModelsCount.reduce((acc, curr) => {
                    acc[curr.model] = curr.count;
                    return acc;
                }, {});
                return uniqueModelsCountObject;
            });
            const finalData = await Promise.all(data);

            let loanedAssetsData = {};
            for (let i = 0; i < uniqueItemNames.length; i++) {
                const element = uniqueItemNames[i];
                loanedAssetsData[element] = finalData[i];
            }
            // console.log('Loaned');
            // console.log(loanedAssetsData);
            return loanedAssetsData;
        } else {
            navigate('/');
        }
    }

    const getDataToDisplay = (data) => {
        return (data && Object.keys(data).map((objKey, index) => {
            return (
                <div key={index} className="mt-3">
                    <div>
                        <Typography variant="h5" gutterBottom className='dashboard--assets--name'>{objKey}</Typography>
                        <table className="table table-striped mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">Model</th>
                                    <th scope="col">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(data[objKey]).map((modelKey, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{modelKey}</td>
                                                <td>{data[objKey][modelKey]}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }))
    }

    const csvHeaders = [
        { label: "Service number", key: "serviceNumber" },
        { label: "Name", key: "name" },
        { label: "Serial number", key: "serialNumber" },
        { label: "Model", key: "model" },
        { label: "Gig number", key: "gigNumber" },
        { label: "Issue date", key: "issueDate" },
    ];

    const [csvData, setCsvData] = useState([]);
    const setDownloadData = async () => {
        const data = await getAllItems();
        data.forEach(item => {
            delete item._id;
            delete item.__v;
            delete item.dataCreationDate;
            item.issueDate = new Date(item.issueDate).toDateString();
        });
        setCsvData(data);
    }
    const date = new Date();
    const dateString = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <div className="container dashboard">
                    <Typography variant="h2" gutterBottom className='mt-5'>Dashboard</Typography>

                    <div className="accordion accordion-flush" id="dashboard--assets-accordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Total Assets: {totalAssets}
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#dashboard--assets-accordion">
                                <div className="accordion-body">{getDataToDisplay(totalAssetsData)}</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Inventory Assets: {totalInventoryAssets}
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#dashboard--assets-accordion">
                                <div className="accordion-body">{getDataToDisplay(inventoryAssetsData)}</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                    Loaned Assets: {totalLoanedAssets}
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#dashboard--assets-accordion">
                                <div className="accordion-body">{getDataToDisplay(loanedAssetsData)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <CSVLink data={csvData} headers={csvHeaders} filename={`total_asset_data__${dateString}`}>
                            <Button variant="contained" color="primary">
                                <DownloadIcon /> Download Data
                            </Button>
                        </CSVLink>
                    </div>

                </div>
            </>
        ) : (
            navigate('/')
        )
    )
}

export default Dashboard