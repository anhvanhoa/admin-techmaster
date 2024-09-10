import dataProvider from '@refinedev/simple-rest';
import axios from 'axios';
const mediaAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MEDIA_API_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
export const mediaProvider = dataProvider(
    import.meta.env.VITE_MEDIA_API_DOMAIN,
    mediaAxiosInstance,
);
