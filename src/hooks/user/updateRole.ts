import { Role } from '@/types/global';
import { useForm } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';

const useUpdateRole = () => {
    const parsed = useParsed();
    const formUpdateRole = useForm<Role[]>({
        resource: 'user/role',
        id: parsed.id,
        action: 'edit',
        mutationMeta: {
            method: 'put',
        },
    });
    const data = formUpdateRole.query?.data?.data || [];
    const roles = data.map((item) => item.id);
    return { formUpdateRole, data, roles };
};

export default useUpdateRole;
