import { RoleReponse } from '@/types/role';
import { useForm, useTable } from '@refinedev/antd';

const useRoles = ({
    onMutationSuccess,
}: {
    onMutationSuccess?: () => void;
}) => {
    const table = useTable<RoleReponse>({
        resource: `role/all`,
    });
    const formCreate = useForm({
        resource: 'role/create',
        onMutationSuccess: () => {
            table.tableQuery.refetch();
            onMutationSuccess && onMutationSuccess();
        },
    });

    return { table, formCreate };
};

export default useRoles;
