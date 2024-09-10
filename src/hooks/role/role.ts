import { RuleByRole } from '@/types/rule';
import { useTable } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';

const useRole = () => {
    const parsed = useParsed<{
        name: string;
        id: string;
    }>();

    const tableRole = useTable<RuleByRole>({
        resource: `rule/by-role/${parsed.params?.id}`,
    });

    return { tableRole, name: parsed.params?.name };
};

export default useRole;
