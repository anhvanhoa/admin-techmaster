import { Breadcrumb } from '@refinedev/antd';
import { Tabs, TabsProps } from 'antd';
import FormEdit from './components/edit/FormEdit';
import { CSSProperties } from 'react';
import Role from './components/edit/Role';
const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Thông tin cơ bản',
        children: <FormEdit />,
    },
    {
        key: '2',
        label: 'Quyền người dùng',
        children: <Role />,
    },
];

export const UserEdit = () => {
    const stylesBreadcrumb: CSSProperties = {
        marginBottom: '20px',
    };
    return (
        <div>
            <Breadcrumb
                breadcrumbProps={{
                    style: stylesBreadcrumb,
                }}
            />
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};
