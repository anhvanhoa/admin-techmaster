import { useTable } from '@refinedev/antd';

const useRules = () => {
    const tableRule = useTable({
        resource: `rule/all`,
    });
    return { tableRule };
};

export default useRules;
