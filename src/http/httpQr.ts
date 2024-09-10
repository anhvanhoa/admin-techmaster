import dataProvider from '@refinedev/simple-rest';
import axios from 'axios';
const vietQRAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_QR_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const qrProvider = dataProvider(
    import.meta.env.VITE_QR_DOMAIN,
    vietQRAxiosInstance,
);
