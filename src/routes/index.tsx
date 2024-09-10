import { Authenticated } from '@refinedev/core';
import {
    CatchAllNavigate,
    NavigateToResource,
} from '@refinedev/react-router-v6';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ThemedLayoutV2 } from '@/components/layout';
import { Header } from '@/components/header';
import { ThemedSiderV2 } from '@/components/layout/sider';
import { ThemedTitleV2 } from '@/components/layout/title';
import routers, { Route as RouteType } from './root';
import { ErrorComponent } from '@refinedev/antd';
import Logo from '@/components/layout/logo';

const Layout = (
    <ThemedLayoutV2
        Header={Header}
        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
        Title={(props) => <ThemedTitleV2 {...props} icon={<Logo />} />}
    >
        <Outlet />
    </ThemedLayoutV2>
);

export default function Routers() {
    const render = (route: RouteType[]) => {
        return (
            <>
                {route.map((route) => (
                    <Route key={route.path} path={route.path}>
                        <Route
                            key={route.path}
                            index
                            element={route.element}
                        ></Route>
                        {route.childrens && render(route.childrens)}
                    </Route>
                ))}
            </>
        );
    };
    return (
        <Routes>
            <Route
                element={
                    <Authenticated
                        key={routers.public.keyAuth}
                        fallback={<Outlet />}
                    >
                        <NavigateToResource />
                    </Authenticated>
                }
            >
                {routers.public.routes.map((route, index) => (
                    <Route key={index} {...route} />
                ))}
                {render(routers.public.routes)}
            </Route>
            <Route
                element={
                    <Authenticated
                        key={routers.private.keyAuth}
                        fallback={<CatchAllNavigate to="/login" />}
                    >
                        {Layout}
                    </Authenticated>
                }
            >
                {render(routers.private.routes)}

                <Route path="*" element={<ErrorComponent />} />
            </Route>
        </Routes>
    );
}
