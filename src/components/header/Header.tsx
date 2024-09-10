import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import { useGetIdentity } from '@refinedev/core';
import {
    Layout as AntdLayout,
    Badge,
    Button,
    Dropdown,
    Flex,
    Space,
    theme,
} from 'antd';
// import React, { useContext } from 'react';
import { IUser } from '@/types/user';
// import { ColorModeContext } from '@/contexts/color-mode';
import { MenuProps } from 'antd/lib';
import { UserOutlined } from '@ant-design/icons';

const { useToken } = theme;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={import.meta.env.VITE_API_MAIN}
            >
                Trang chủ
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={import.meta.env.VITE_TEACHER_URL}
            >
                Trang giảng viên
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={import.meta.env.VITE_LEARN_URL}
            >
                Trang học tập
            </a>
        ),
    },
    {
        key: '4',
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={import.meta.env.VITE_PROFILE_URL}
            >
                Hồ sơ của tui
            </a>
        ),
    },
];

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
    sticky = true,
}) => {
    const { token } = useToken();
    const { data: user } = useGetIdentity<IUser>();
    // const { mode, setMode } = useContext(ColorModeContext);

    const headerStyles: React.CSSProperties = {
        backgroundColor: token.colorBgContainer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 24px',
        height: '64px',
    };

    if (sticky) {
        headerStyles.position = 'sticky';
        headerStyles.top = 0;
        headerStyles.zIndex = 20;
    }
    return (
        <AntdLayout.Header style={headerStyles}>
            <Space>
                {/* <Switch
                    checkedChildren='🌛'
                    unCheckedChildren='🔆'
                    onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
                    defaultChecked={mode === 'dark'}
                /> */}
                <div></div>
            </Space>
            <Space>
                <Flex justify="center" align="center" gap={'8px'}>
                    <Flex gap={'4px'}>
                        {user?.roles.map((role) => (
                            <Badge
                                key={role.id}
                                count={role.name}
                                style={{
                                    backgroundColor: token.colorPrimaryActive,
                                    color: 'white',
                                }}
                            />
                        ))}
                    </Flex>
                    {user?.full_name && (
                        <Dropdown
                            menu={{ items }}
                            placement="bottomRight"
                            arrow
                        >
                            <Button icon={<UserOutlined />}>
                                {user.full_name}
                            </Button>
                        </Dropdown>
                    )}
                </Flex>
            </Space>
        </AntdLayout.Header>
    );
};
