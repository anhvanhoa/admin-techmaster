import type { AuthProvider } from '@refinedev/core';
import { userAxiosInstance } from './http/httpUser';
import { ResponseLogin } from './types/auth';
import { axiosInstance } from './http/dataProvider';
import { IUser } from './types/user';

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        if (email && password) {
            const res = await userAxiosInstance.post<ResponseLogin>('/login', {
                email,
                password,
            });
            if (
                res.status === 200 &&
                res.data.email &&
                res.data.roles.length > 0
            ) {
                return {
                    success: true,
                    redirectTo: '/',
                };
            }
            return {
                success: false,
                error: {
                    message: 'User is not authenticated',
                    statusCode: 401,
                    name: 'NotAuthenticated',
                },
            };
        }
        return {
            success: false,
            error: {
                message: 'User is not authenticated',
                statusCode: 401,
                name: 'NotAuthenticated',
            },
        };
    },
    logout: async () => {
        await userAxiosInstance.get<string>('/logout');
        location.reload();
        return {
            success: true,
            redirectTo: '/login',
            successNotification: {
                message: 'User is logged out',
                description: 'User is logged out',
            },
        };
    },
    check: async () => {
        const res = await axiosInstance.get<IUser>('/profile');
        const isAuth = res.data.email && res.data.roles.length > 0;
        if (isAuth) {
            return {
                authenticated: true,
            };
        }
        return {
            authenticated: false,
            redirectTo: '/login',
            error: {
                message: 'User is not authenticated',
                statusCode: 401,
                name: 'NotAuthenticated',
            },
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const res = await axiosInstance.get<IUser>('/profile');
        const isAuth = res.data.email && res.data.roles.length > 0;
        if (isAuth) {
            return res.data;
        }
        return null;
    },
    onError: async (error) => {
        return { error };
    },
};
