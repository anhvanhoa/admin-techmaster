import dataProvider from '@refinedev/simple-rest';
import axios from 'axios';
export const userAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_USER,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const userProvider = dataProvider(
    import.meta.env.VITE_API_USER,
    userAxiosInstance,
);
