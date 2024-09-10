import {
    useRefreshRolesAdmin,
    useRefreshRolesMain,
} from '@/hooks/role/refresh';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import React, { CSSProperties } from 'react';

type GroupButtonProps = {
    onCreate?: () => void;
};

const GroupButton: React.FC<GroupButtonProps> = ({ onCreate }) => {
    const styleMain: CSSProperties = {
        backgroundColor: '#5521B5',
    };
    const styleAdmin: CSSProperties = {
        backgroundColor: '#036C4E',
    };
    const { handRefreshMain } = useRefreshRolesMain();
    const { handRefreshAdmin } = useRefreshRolesAdmin();
    return (
        <Flex gap={'8px'}>
            <Button
                onClick={handRefreshMain}
                type="primary"
                style={styleMain}
                icon={<ReloadOutlined />}
            >
                Load main
            </Button>
            <Button
                onClick={handRefreshAdmin}
                type="primary"
                style={styleAdmin}
                icon={<ReloadOutlined />}
            >
                Load admin
            </Button>
            <Button onClick={onCreate} type="primary" icon={<PlusOutlined />}>
                Tạo role
            </Button>
        </Flex>
    );
};

export default GroupButton;
