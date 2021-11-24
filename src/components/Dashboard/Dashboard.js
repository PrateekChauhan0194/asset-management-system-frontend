import './Dashboard.css';
import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { isLoggedIn } from '../../services/AuthService';
import Navbar from '../Navbar/Navbar';
import { getAllItems } from '../../services/APIComms';

const Dashboard = () => {
    const [totalAssets, setTotalAssets] = React.useState(0);
    const [totalInventoryAssets, setTotalInventoryAssets] = React.useState(0);
    const [totalLoanedAssets, setTotalLoanedAssets] = React.useState(0);
    const [uniqueItemNames, setUniqueItemNames] = React.useState([]);

    const [totalAssetsData, setTotalAssetsData] = React.useState(null);
    const [inventoryAssetsData, setInventoryAssetsData] = React.useState(null);
    const [loanedAssetsData, setLoanedAssetsData] = React.useState(null);

    // eslint-disable-next-line
    useEffect(async () => {
        await setItemCounts();
        setUniqueItemNames(await getUniqueItemNames());
        setTotalAssetsData(await getTotalAssetsData());
        setInventoryAssetsData(await getInventoryAssetsData());
        setLoanedAssetsData(await getLoanedAssetsData());
        // eslint-disable-next-line
    }, []);

    const setItemCounts = async () => {
        const items = await getAllItems();
        const inventoryItems = items.filter(item => item.serviceNumber === 'inventory');
        const loanedItems = items.filter(item => item.serviceNumber !== 'inventory');

        setTotalAssets(items.length);
        setTotalInventoryAssets(inventoryItems.length);
        setTotalLoanedAssets(loanedItems.length);
    }

    const getUniqueItemNames = async () => {
        const items = await getAllItems();
        const itemNames = items.map(item => item.name);
        const uniqueItemNames = [...new Set(itemNames)];
        return uniqueItemNames;
    }

    const getTotalAssetsData = async () => {
        const items = await getAllItems();
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
        console.log('Total');
        console.log(totalAssetsData);
        return totalAssetsData;
    };

    const getInventoryAssetsData = async () => {
        let items = await getAllItems();
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
        console.log('Inventory');
        console.log(inventoryAssetsData);
        return inventoryAssetsData;
    }

    const getLoanedAssetsData = async () => {
        let items = await getAllItems();
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
        console.log('Loaned');
        console.log(loanedAssetsData);
        return loanedAssetsData;
    }

    return (
        isLoggedIn() ? (
            <>
                <Navbar />
                <div className="container dashboard">
                    <Typography variant="h2" gutterBottom className='mt-5'>Dashboard</Typography>

                    {/* Display totalAssetsData */}
                    <div cssName="dashboard--total-assets">
                        <Typography variant="h3" gutterBottom className='mt-5'>Total Assets: {totalAssets}</Typography>
                        <div className='mt-3'>
                            {
                                totalAssetsData && Object.keys(totalAssetsData).map((objKey, index) => {
                                    return (
                                        <div key={index} className="mt-3">
                                            <div>
                                                <Typography variant="h5" gutterBottom className='dashboard--total-assets--name'>{objKey}</Typography>
                                                {/* Display as bootstrap table */}
                                                <table className="table table-striped mb-5">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Model</th>
                                                            <th scope="col">Count</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Object.keys(totalAssetsData[objKey]).map((modelKey, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{modelKey}</td>
                                                                        <td>{totalAssetsData[objKey][modelKey]}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/* Display inventoryAssetsData */}
                    <div cssName="dashboard--inventory-assets">
                        <Typography variant="h3" gutterBottom className='mt-5'>Inventory Assets: {totalInventoryAssets}</Typography>
                        <div className='mt-3'>
                            {
                                inventoryAssetsData && Object.keys(inventoryAssetsData).map((objKey, index) => {
                                    return (
                                        <div key={index} className="mt-3">
                                            <div>
                                                <Typography variant="h5" gutterBottom className='dashboard--inventory-assets--name'>{objKey}</Typography>
                                                {/* Display as bootstrap table */}
                                                <table className="table table-striped mb-5">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Model</th>
                                                            <th scope="col">Count</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Object.keys(inventoryAssetsData[objKey]).map((modelKey, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{modelKey}</td>
                                                                        <td>{inventoryAssetsData[objKey][modelKey]}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/* Display loanedAssetsData */}
                    <div cssName="dashboard--loaned-assets">
                        <Typography variant="h3" gutterBottom className='mt-5'>Loaned Assets: {totalLoanedAssets}</Typography>
                        <div className='mt-3'>
                            {
                                loanedAssetsData && Object.keys(loanedAssetsData).map((objKey, index) => {
                                    return (
                                        <div key={index} className="mt-3">
                                            <div>
                                                <Typography variant="h5" gutterBottom className='dashboard--loaned-assets--name'>{objKey}</Typography>
                                                {/* Display as bootstrap table */}
                                                <table className="table table-striped mb-5">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Model</th>
                                                            <th scope="col">Count</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Object.keys(loanedAssetsData[objKey]).map((modelKey, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{modelKey}</td>
                                                                        <td>{loanedAssetsData[objKey][modelKey]}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>



                    <Typography variant="h3" gutterBottom className='mt-5'>Defects</Typography>
                    Should not issue item if the loan card with entered service number does not exist <br />
                    Error while trying to edit the loan card with no change.

                    <Typography variant="h3" gutterBottom className='mt-5'>Todo</Typography>
                    Change password feature <br />

                    <br />
                </div>
            </>
        ) : (
            window.location.href = '/'
        )
    )
}

export default Dashboard