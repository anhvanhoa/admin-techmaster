import Roles from '@/pages/roles/list';
import { Route } from './root';
import DetailRole from '@/pages/roles/detail';

const roleRoutes: Route = {
    path: '/roles',
    element: <Roles />,
    childrens: [
        {
            path: ':id/:name',
            element: <DetailRole />,
        },
    ],
};

export default roleRoutes;
