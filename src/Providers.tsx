import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { NotificationProvider } from "./components/Contexts/NotificationContext/NotificationContext";
import { CreateDocumentProvider } from "./components/Contexts/CreateDocumentContext/CreateDocumentContext";
import {EditEmployeeProvider} from "./components/Contexts/EditEmployeeContext/EditEmployeeContext.tsx";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
    <Provider store={store}>
        <NotificationProvider>
            <CreateDocumentProvider>
                <EditEmployeeProvider>
                    {children}
                </EditEmployeeProvider>
            </CreateDocumentProvider>
        </NotificationProvider>
    </Provider>
);
