import Logo from '@/components/layout/logo';
import { AuthPage } from '@refinedev/antd';
import { Flex, Typography } from 'antd';
import { CSSProperties } from 'react';

export const Login = () => {
    const styleLogo: CSSProperties = {
        width: '40px',
        height: '40px',
    };
    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues: { email: '', password: '' },
            }}
            title={false}
            rememberMe={false}
            contentProps={{
                title: (
                    <Flex vertical align="center">
                        <Logo style={styleLogo} />
                        <Typography.Title
                            level={4}
                            style={{
                                fontWeight: '700',
                                textAlign: 'center',
                                marginTop: '8px',
                            }}
                        >
                            Đăng nhập vào trong quản trị
                        </Typography.Title>
                    </Flex>
                ),
            }}
            forgotPasswordLink={false}
            registerLink={false}
        />
    );
};
