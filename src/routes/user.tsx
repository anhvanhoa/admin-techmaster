import { UserEdit, UserList } from '@/pages/users';
import { Route } from './root';

const userRoutes: Route = {
    path: '/users',
    element: <UserList />,
    childrens: [
        {
            path: ':id',
            element: <UserEdit />,
        },
    ],
};

export default userRoutes;
