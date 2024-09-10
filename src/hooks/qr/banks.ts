import { Bank } from '@/types/global';
import { useCustom } from '@refinedev/core';

const useBanks = () => {
    const { data: banks } = useCustom<{ data: Bank[] }>({
        url: `v2/banks`,
        method: 'get',
        dataProviderName: 'qr',
    });
    const options = banks?.data.data.map((bank: Bank) => ({
        value: bank.bin,
        label: ` ${bank.shortName} (${bank.name})`,
        shortName: bank.shortName,
    }));

    return {
        banks,
        options,
    };
};

export default useBanks;
