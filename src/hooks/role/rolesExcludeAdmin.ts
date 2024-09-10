import { Role } from '@/types/global';
import { useSelect } from '@refinedev/core';
const useRolesExcludeAdmin = (props?: { excludeAdmin?: boolean }) => {
    const roles = useSelect<Role>({
        resource: `role/all?excludeAdmin=${props?.excludeAdmin || false}`,
    });
    const data = roles.query.data?.data || [];
    const optionRoles = data.map((role) => ({
        label: role.name,
        value: role.id,
    }));

    const filterRoles = data.map((item) => ({
        text: item.name,
        value: item.name,
    }));
    return { filterRoles, optionRoles, data, roles };
};

export default useRolesExcludeAdmin;
