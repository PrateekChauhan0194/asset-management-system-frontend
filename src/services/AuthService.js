import { API_HOST } from "../config";
import { toast } from "react-toastify";

const login = async (username, password) => {
    const response = await fetch(`${API_HOST}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
        })
    });

    const data = await response.json();

    if (response.status === 200) {
        const auth_token = data.token;
        localStorage.setItem('auth_token', auth_token);
        return true;
    } else {
        toast.error('Incorrect username or password!', {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true
        });
        localStorage.removeItem('auth_token');
        document.getElementsByName('password')[0].value = '';
        return false;
    }
};

const logout = () => {
    localStorage.removeItem('auth_token');
}

const isLoggedIn = async () => {
    const auth_token = localStorage.getItem('auth_token');
    if (!auth_token) {
        // console.log('Not logged in');
        return false;
    }
    const response = await fetch(`${API_HOST}/api/v1/auth`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth_token': auth_token
        }
    });

    const data = await response.json();
    if (response.status === 200 && data !== null) {
        return true;
    } else {
        return false;
    }
}

export { login, logout, isLoggedIn };