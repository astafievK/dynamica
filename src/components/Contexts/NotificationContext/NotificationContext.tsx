import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import {ModalUserNotification} from "../../Modals/ModalUserNotification/ModalUserNotification.tsx";

interface Notification {
    title?: string;
    message: string;
}

interface NotificationContextType {
    notify: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification must be used within a NotificationProvider");
    return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    const notify = (notification: Notification) => {
        setNotification(notification);
    };

    const handleClose = () => setNotification(null);

    const modalRoot = document.getElementById("modal-root");

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            {modalRoot && notification &&
                ReactDOM.createPortal(
                    <ModalUserNotification
                        title={notification.title}
                        message={notification.message}
                        onClose={handleClose}
                    />,
                    modalRoot
                )}
        </NotificationContext.Provider>
    );
};
