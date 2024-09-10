import React from 'react';
import {
    useTranslate,
    useUserFriendlyName,
    useRefineContext,
    useRouterType,
    useResource,
} from '@refinedev/core';
import {
    Breadcrumb,
    CreateButton,
    type CreateButtonProps,
    PageHeader,
} from '@refinedev/antd';
import { Space, theme } from 'antd';
import type { ListProps } from '@refinedev/antd';

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/list} for more details.
 */
const { useToken } = theme;
export const List: React.FC<
    ListProps & { titleType?: 'plural' | 'singular' }
> = ({
    canCreate,
    title,
    children,
    createButtonProps: createButtonPropsFromProps,
    resource: resourceFromProps,
    wrapperProps,
    contentProps,
    headerProps,
    breadcrumb: breadcrumbFromProps,
    headerButtonProps,
    headerButtons,
    titleType = 'plural',
}) => {
    const translate = useTranslate();
    const { token } = useToken();
    const { options: { breadcrumb: globalBreadcrumb } = {} } =
        useRefineContext();

    const routerType = useRouterType();
    const getUserFriendlyName = useUserFriendlyName();

    const { resource, identifier } = useResource(resourceFromProps);

    const isCreateButtonVisible =
        canCreate ??
        ((resource?.canCreate ?? !!resource?.create) ||
            createButtonPropsFromProps);

    const breadcrumb =
        typeof breadcrumbFromProps === 'undefined'
            ? globalBreadcrumb
            : breadcrumbFromProps;

    const createButtonProps: CreateButtonProps | undefined =
        isCreateButtonVisible
            ? {
                  size: 'middle',
                  resource:
                      routerType === 'legacy' ? resource?.route : identifier,
                  ...createButtonPropsFromProps,
              }
            : undefined;

    const defaultExtra = isCreateButtonVisible ? (
        <CreateButton {...createButtonProps} />
    ) : null;
    const Title = (
        <span
            style={{
                color: token.colorText,
            }}
        >
            {title ??
                translate(
                    `${identifier}.titles.list`,
                    getUserFriendlyName(
                        resource?.meta?.label ??
                            resource?.options?.label ??
                            resource?.label ??
                            identifier,
                        titleType,
                    ),
                )}
        </span>
    );
    return (
        <div {...(wrapperProps ?? {})}>
            <PageHeader
                ghost={false}
                title={Title}
                extra={
                    headerButtons ? (
                        <Space wrap {...headerButtonProps}>
                            {typeof headerButtons === 'function'
                                ? headerButtons({
                                      defaultButtons: defaultExtra,
                                      createButtonProps,
                                  })
                                : headerButtons}
                        </Space>
                    ) : (
                        defaultExtra
                    )
                }
                breadcrumb={
                    typeof breadcrumb !== 'undefined' ? (
                        <>{breadcrumb}</>
                    ) : (
                        <div
                            style={{
                                marginBottom: '20px',
                            }}
                        >
                            <Breadcrumb />
                        </div>
                    )
                }
                {...(headerProps ?? {})}
            >
                <div {...(contentProps ?? {})}>{children}</div>
            </PageHeader>
        </div>
    );
};
