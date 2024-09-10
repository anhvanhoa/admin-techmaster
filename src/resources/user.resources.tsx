import { UserOutlined } from '@ant-design/icons';
import { ResourceProps } from '@refinedev/core';

const userResources: ResourceProps[] = [
    {
        name: 'manager_user',
        meta: {
            icon: <UserOutlined />,
            label: 'Quản lý người dùng',
        },
    },
    {
        name: 'users',
        list: '/users',
        edit: '/users/:id',
        create: '/users/create',
        meta: {
            parent: 'manager_user',
            label: 'Danh sách người dùng',
        },
    },
];

export default userResources;
