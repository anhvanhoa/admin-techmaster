import { SwapOutlined } from '@ant-design/icons';
import { ResourceProps } from '@refinedev/core';

const roleResources: ResourceProps[] = [
    {
        name: 'roles',
        list: '/roles',
        show: '/roles/:id/:name',
        meta: {
            icon: <SwapOutlined />,
            label: 'Quản lý roles',
        },
    },
];

export default roleResources;
