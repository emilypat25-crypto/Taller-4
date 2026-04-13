
import axios from 'axios';

const isProd = import.meta.env.PROD;
const api = axios.create({
    baseURL: isProd
        ? import.meta.env.VITE_API_URL
        : "http://localhost:5000",
});

export const registerUser = (data) =>
    api.post('/api/auth/register', data);

export const loginUser = (data) =>
    api.post('/api/auth/login', data);
