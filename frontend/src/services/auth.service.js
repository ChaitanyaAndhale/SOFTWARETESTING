import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth/';

const register = (username, password, role) => {
    return axios.post(API_URL + 'register', {
        username,
        password,
        role,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + 'login', {
            username,
            password,
        })
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
