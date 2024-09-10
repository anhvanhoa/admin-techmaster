import { RoleReponse } from '@/types/role';
import { useTableReturnType } from '@refinedev/antd';
import { useDelete, useModal } from '@refinedev/core';
import { useMemo, useState } from 'react';
type Role = {
    id: number;
    name: string;
    userCount: number;
    ruleCount: number;
    nameConfirm: string;
};

const defaultRoleConfirm: Role = {
    id: 0,
    name: '',
    ruleCount: 0,
    userCount: 0,
    nameConfirm: '',
};
const useConfirm = ({ table }: { table: useTableReturnType<RoleReponse> }) => {
    const { close, show, visible } = useModal();
    const [roleConfirm, setRoleConfirm] = useState<Role>(defaultRoleConfirm);

    const handleDeleteRole = (data: Role) => () => {
        setRoleConfirm(data);
        show();
    };
    const compareName = useMemo(() => {
        return roleConfirm.name === roleConfirm.nameConfirm;
    }, [roleConfirm.nameConfirm, roleConfirm.name]);

    const deleteRole = useDelete();
    const handleConfirmDeleteRole = () => {
        const resource = `role/${roleConfirm.id}/${roleConfirm.nameConfirm}`;
        deleteRole.mutate(
            { resource, id: '' },
            {
                onSuccess: () => {
                    table.tableQuery.refetch();
                },
            },
        );
        close();
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoleConfirm({ ...roleConfirm, nameConfirm: e.target.value });
    };

    const handleCancel = () => {
        setRoleConfirm(defaultRoleConfirm);
        close();
    };

    return {
        visible,
        handleDeleteRole,
        handleConfirmDeleteRole,
        compareName,
        handleChangeName,
        handleCancel,
        roleConfirm,
    };
};

export default useConfirm;
