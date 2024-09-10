import { useList } from '@refinedev/core';

export const useRefreshRulesMain = () => {
    const refreshMain = useList({
        dataProviderName: 'main',
        resource: 'refresh-rules',
        queryOptions: {
            enabled: false,
        },
        successNotification() {
            return {
                message: 'Refresh main thành công',
                description: 'Danh sách rules đã được cập nhật',
                type: 'success',
            };
        },
    });
    const handRefreshMain = () => refreshMain.refetch();
    return { refreshMain, handRefreshMain };
};
export const useRefreshRulesAdmin = () => {
    const refreshAdmin = useList({
        resource: 'refresh/rules',
        queryOptions: {
            enabled: false,
        },
        successNotification() {
            return {
                message: 'Refresh admin thành công',
                description: 'Danh sách rule đã được cập nhật',
                type: 'success',
            };
        },
    });
    const handRefreshAdmin = () => refreshAdmin.refetch();
    return { refreshAdmin, handRefreshAdmin };
};
