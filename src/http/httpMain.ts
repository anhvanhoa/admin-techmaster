import dataProvider from '@refinedev/simple-rest';
import axios from 'axios';
const mainAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_MAIN,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
export const mainProvider = dataProvider(
    import.meta.env.VITE_API_MAIN,
    mainAxiosInstance,
);
