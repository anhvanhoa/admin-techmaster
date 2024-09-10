import { useSelect } from '@refinedev/antd';

type Service = {
    id: number;
    name: string;
};

const useServices = () => {
    const services = useSelect<Service>({
        resource: 'rule/services',
    });
    const data = services.query.data?.data || ([] as Service[]);
    const filterServices = data.map((item) => ({
        text: item.name,
        value: item.name,
    }));
    return { services, filterServices };
};

export default useServices;
