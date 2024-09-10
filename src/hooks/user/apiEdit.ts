import { useForm } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import dayjs from 'dayjs';

const useApiEdit = () => {
    const parsed = useParsed();
    const formEdit = useForm<{
        full_name: string;
        dob: string;
    }>({
        resource: 'user',
        id: parsed.id,
        action: 'edit',
        mutationMeta: {
            method: 'put',
        },
    });
    const data = formEdit.query?.data?.data;
    const init = {
        ...formEdit.formProps.initialValues,
        dob: data?.dob ? dayjs(data.dob) : undefined,
    };
    return {
        formEdit,
        data,
        init,
    };
};

export default useApiEdit;
