import { Flex } from 'antd';
import Input from 'antd/es/input/Input';

const MediaTitle = () => {
    return (
        <Flex
            justify="space-between"
            align="center"
            style={{ paddingBottom: '8px' }}
        >
            <h3>Quản lý thư viện</h3>
            <div>
                <Input placeholder="Tìm kiếm" />
            </div>
        </Flex>
    );
};

export default MediaTitle;
