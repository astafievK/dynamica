import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ModalUserNotification.css";

interface ModalUserNotificationProps {
    title?: string;
    message?: string;
    onClose: () => void;
}

export const ModalUserNotification: FC<ModalUserNotificationProps> = ({ title, message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [title, message]);

    return (
        <AnimatePresence onExitComplete={onClose}>
            {visible && (
                <motion.div
                    className="modal-notification"
                    initial={{ y: "100%" }}
                    animate={{ y: "-50px" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {title && <span className="modal-notification__title">{title}</span>}
                    {message && <span className="modal-notification__description">{message}</span>}
                </motion.div>
            )}
        </AnimatePresence>
    );
};