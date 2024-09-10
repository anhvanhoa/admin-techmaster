import {
    useRefreshRulesAdmin,
    useRefreshRulesMain,
} from '@/hooks/rule/refreshs';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { CSSProperties } from 'react';

const GroupButton = () => {
    const styleMain: CSSProperties = {
        backgroundColor: '#5521B5',
    };
    const styleAdmin: CSSProperties = {
        backgroundColor: '#036C4E',
    };
    const { handRefreshMain } = useRefreshRulesMain();
    const { handRefreshAdmin } = useRefreshRulesAdmin();

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
        </Flex>
    );
};

export default GroupButton;
