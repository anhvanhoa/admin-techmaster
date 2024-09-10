import { SaveButton } from '@refinedev/antd';
import { ButtonProps, Flex } from 'antd';

type GroupButtonProps = {
    saveButtonProps: ButtonProps & {
        onClick: () => void;
    };
};

const GroupButton: React.FC<GroupButtonProps> = ({ saveButtonProps }) => {
    return (
        <Flex gap={'8px'}>
            <SaveButton style={{ marginRight: '20px' }} {...saveButtonProps}>
                Lưu user
            </SaveButton>
        </Flex>
    );
};

export default GroupButton;
