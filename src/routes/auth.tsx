import { Login } from '@/pages/login';
import { Route } from './root';

export const auth: Route[] = [
    {
        path: '/login',
        element: <Login />,
    },
];
