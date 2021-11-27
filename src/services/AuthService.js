import { API_HOST } from "../config";
import { toast } from "react-toastify";

const login = async (username, password) => {
    // sessionStorage.setItem('isLoggedIn', btoa(true));
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
        window.location.href = '/dashboard';
    } else {
        toast.error('Incorrect username or password!', {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true
        });
        localStorage.removeItem('auth_token');
        document.getElementsByName('password')[0].value = '';
    }
};

const logout = () => {
    // sessionStorage.setItem('isLoggedIn', btoa(false));
    localStorage.removeItem('auth_token');
    window.location.href = '/';

    // Clear borwser cache
    window.location.reload(true);
}

const isLoggedIn = async () => {
    // return atob(sessionStorage.getItem('isLoggedIn')) === 'true';
    // return localStorage.getItem('auth_token') !== null;

    const auth_token = localStorage.getItem('auth_token');
    if (!auth_token) {
        console.log('Not logged in');
        window.location.href = '/';
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
    }
    return false;
}

export { login, logout, isLoggedIn };