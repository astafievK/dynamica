import { FC, useEffect, useState } from "react";
import {useAppDispatch, useTypedSelector} from "../../../store/hooks/redux.ts";
import { setModalNotificationsIsOpen } from "../../../api/slices/modalNotificationsSlice.ts";
import {ModuleNotifications} from "../../ModuleNotifications/ModuleNotifications.tsx";
import {Cross} from "../../Cross/Cross.tsx";

export const ModalNotifications: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useTypedSelector((state) => state.modalNotificationsReducer.modalNotificationsIsOpen);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            dispatch(setModalNotificationsIsOpen(false));
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
                <div className="modal-content__header">
                    <span className={"modal-title"}>Уведомления</span>
                    <Cross onClick={() => handleClose()} color={"#000000"} />
                </div>
                <div className="modal-content__body">
                    <ModuleNotifications/>
                </div>
            </div>
            <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
        </div>
    );
};
