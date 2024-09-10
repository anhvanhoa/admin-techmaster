import axios from 'axios';
import { mediaProvider } from './httpMedia';
import { mainProvider } from './httpMain';
import { qrProvider } from './httpQr';
import { DataProviders } from '@refinedev/core';
import { userProvider } from './httpUser';
import dataProvider from '@refinedev/simple-rest';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
    },
});
export const adminProvider = dataProvider(
    import.meta.env.VITE_API_DOMAIN,
    axiosInstance,
);

const apiProvider: DataProviders = {
    default: adminProvider,
    media: mediaProvider,
    main: mainProvider,
    qr: qrProvider,
    user: userProvider,
};
export default apiProvider;
