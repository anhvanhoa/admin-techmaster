import { useList } from '@refinedev/core';

export const useRefreshRolesMain = () => {
    const refreshMain = useList({
        dataProviderName: 'main',
        resource: 'refresh-roles',
        queryOptions: {
            enabled: false,
        },
        successNotification() {
            return {
                message: 'Refresh main thành công',
                description: 'Danh sách role đã được cập nhật',
                type: 'success',
            };
        },
    });
    const handRefreshMain = () => {
        refreshMain.refetch();
    };
    return { refreshMain, handRefreshMain };
};

export const useRefreshRolesAdmin = () => {
    const refreshAdmin = useList({
        resource: 'refresh/roles',
        queryOptions: {
            enabled: false,
        },
        successNotification() {
            return {
                message: 'Refresh admin thành công',
                description: 'Danh sách role đã được cập nhật',
                type: 'success',
            };
        },
    });

    const handRefreshAdmin = () => {
        refreshAdmin.refetch();
    };

    return { refreshAdmin, handRefreshAdmin };
};
