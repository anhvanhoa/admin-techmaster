import { Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import routerBindings, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { App as AntdApp } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { authProvider } from './authProvider';
import { ColorModeContextProvider } from './contexts/color-mode';
import resources from './resources';
import apiProvider from './http/dataProvider';
import { optionRefine } from './constants/refine';
import Routers from './routes';

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <AntdApp>
                        <DevtoolsProvider>
                            <Refine
                                dataProvider={apiProvider}
                                notificationProvider={useNotificationProvider}
                                routerProvider={routerBindings}
                                authProvider={authProvider}
                                resources={resources}
                                options={optionRefine}
                            >
                                <Routers />
                                <RefineKbar />
                                <UnsavedChangesNotifier />
                                <DocumentTitleHandler />
                            </Refine>
                            <DevtoolsPanel />
                        </DevtoolsProvider>
                    </AntdApp>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
