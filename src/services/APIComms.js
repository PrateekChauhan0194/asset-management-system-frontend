import { API_HOST } from '../config';

const getBorrowers = async () => {
    const response = await fetch(`${API_HOST}/api/v1/borrower/getAll`);
    const data = await response.json();
    return data;
}

const getBorrower = async (id) => {
    const response = await fetch(`${API_HOST}/api/v1/borrower/getById/${id}`);
    const data = await response.json();
    return data;
}

const getInventoryItems = async () => {
    const defaultServiceNumber = 'inventory';
    const response = await fetch(`${API_HOST}/api/v1/item/getItems/${defaultServiceNumber}`);
    const data = await response.json();
    return data;
}

const getAllItems = async () => {
    const auth_token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_HOST}/api/v1/item/getAll`, {
        headers: {
            'Content-Type': 'application/json',
            'auth_token': auth_token
        }
    });
    const data = await response.json();
    if (data.error) {
        return false;
    }
    return data;
}

export { getBorrowers, getBorrower, getInventoryItems, getAllItems };