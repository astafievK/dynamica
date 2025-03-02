import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ModalUserNotification.css";

interface ModalUserNotificationProps {
    title?: string;
    message: string;
    onClose: () => void;
}

export const ModalUserNotification: FC<ModalUserNotificationProps> = ({ title, message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence onExitComplete={onClose}>
            {visible && (
                <motion.div
                    className="modal-notification"
                    initial={{ x: "-50%", y: "-200%", opacity: 0 }}
                    animate={{ x: "-50%", y: "0", opacity: 1 }}
                    exit={{ x: "-50%", y: "-200%", opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                    {title && <span className="modal-notification__title">{title}</span>}
                    <span className="modal-notification__description">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
