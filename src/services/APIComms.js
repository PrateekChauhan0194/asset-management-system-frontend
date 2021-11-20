import { API_HOST } from '../config';

const getBorrowers = async () => {
    const response = await fetch(`${API_HOST}/api/v1/borrower/getAll`);
    const data = await response.json();
    return data;
}

export { getBorrowers };