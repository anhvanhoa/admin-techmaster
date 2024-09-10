import { PullRequestOutlined } from '@ant-design/icons';
import { ResourceProps } from '@refinedev/core';

const ruleResources: ResourceProps[] = [
    {
        name: 'rules',
        list: '/rules',
        create: '/categories/create',
        edit: '/categories/edit/:id',
        show: '/category/show/:id',
        meta: {
            canDelete: true,
            icon: <PullRequestOutlined />,
            label: 'Quản lý rules',
        },
    },
];

export default ruleResources;
