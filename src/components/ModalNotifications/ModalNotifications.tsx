import { FC, useEffect, useState } from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux.ts";
import { setIsOpen } from "../../api/slices/modalNotificationsSlice.ts";
import {Notifications} from "./Notifications.tsx";

export const ModalNotifications: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useTypedSelector((state) => state.modalNotificationsReducer.modalNotificationsIsOpen);
    const [isClosing, setIsClosing] = useState(false);
    dispatch(setIsOpen(true));

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            dispatch(setIsOpen(false));
            setIsClosing(false);
        }, 400);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    if (!isOpen && !isClosing) return null;

    return (
        <div className={`modal ${isClosing ? "hidden" : ""}`}>
            <div className={`modal-content modal-notifications ${isClosing ? "hidden" : ""}`}>
                <h1>Уведомления</h1>
                <Notifications/>
            </div>
            <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
        </div>
    );
};
