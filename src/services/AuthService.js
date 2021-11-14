const login = () => {
    sessionStorage.setItem('isLoggedIn', btoa(true));
};

const logout = () => {
    sessionStorage.setItem('isLoggedIn', btoa(false));
}

const isLoggedIn = () => {
    return atob(sessionStorage.getItem('isLoggedIn')) === 'true';
}

export { login, logout, isLoggedIn };