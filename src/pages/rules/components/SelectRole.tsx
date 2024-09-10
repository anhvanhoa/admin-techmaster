import useRolesExcludeAdmin from '@/hooks/role/rolesExcludeAdmin';
import { Select } from 'antd';
import { CSSProperties, FC } from 'react';

type SelectRoleProps = {
    value: number[];
    onChange: (value: number[]) => void;
    disabled?: boolean;
};

const SelectRole: FC<SelectRoleProps> = ({ value, onChange, disabled }) => {
    const { optionRoles, roles } = useRolesExcludeAdmin();
    const style: CSSProperties = {
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.9 : 1,
    };
    return (
        <div style={style}>
            <Select
                placeholder="Select roles"
                mode="multiple"
                style={{ width: '300px' }}
                options={optionRoles}
                loading={roles.query.isLoading}
                value={value}
                onChange={!disabled ? onChange : undefined}
            />
        </div>
    );
};

export default SelectRole;
