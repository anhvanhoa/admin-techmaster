import React from 'react';
import userRoutes from './user';
import ruleRoutes from './rule';
import roleRoutes from './role';
import { auth } from './auth';

export type Route = {
    path: string;
    element: React.ReactNode;
    childrens?: Route[];
};

const routers = {
    public: {
        keyAuth: 'authenticated-inner',
        routes: [...auth],
    },
    private: {
        keyAuth: 'authenticated-outer',
        routes: [userRoutes, ruleRoutes, roleRoutes],
    },
};

export default routers;
