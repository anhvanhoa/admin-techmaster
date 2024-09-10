import useRolesExcludeAdmin from '@/hooks/role/rolesExcludeAdmin';
import useUpdateRole from '@/hooks/user/updateRole';
import { SaveButton } from '@refinedev/antd';
import { Form, Select } from 'antd';
import { CSSProperties } from 'react';

const styleForm: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
};

const FormRole = () => {
    const { optionRoles } = useRolesExcludeAdmin({ excludeAdmin: true });
    const { formUpdateRole, roles } = useUpdateRole();
    return (
        <Form
            style={styleForm}
            {...formUpdateRole.formProps}
            initialValues={{ roles }}
        >
            <Form.Item
                style={{ marginBottom: 0, flex: 1 }}
                name="roles"
                label="Chọn role cho user"
                rules={[{ required: true, message: 'Vui lòng chọn role' }]}
            >
                <Select
                    defaultValue={roles}
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Chọn role cho user"
                    options={optionRoles}
                />
            </Form.Item>
            <SaveButton {...formUpdateRole.saveButtonProps}>Lưu</SaveButton>
        </Form>
    );
};

export default FormRole;
