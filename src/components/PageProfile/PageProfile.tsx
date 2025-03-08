import { FC, useEffect, useState } from "react";
import { pageAnimation } from "../../motionSettins.ts";
import { motion } from "framer-motion";
import { ModuleDocuments } from "../ModuleDocuments/ModuleDocuments.tsx";
import { ModuleNotifications } from "../ModuleNotifications/ModuleNotifications.tsx";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { useAppDispatch, useTypedSelector } from "../../store/hooks/redux.ts";
import { useNavigate } from "react-router-dom";

export const PageProfile: FC = () => {
    const { user } = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        if (!user) {
            dispatch(setLoginModalOpen(true));
        } else {
            document.title = "Профиль";
        }
    }, [user, dispatch, navigate]);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const dateOptions: Intl.DateTimeFormatOptions = {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Europe/Moscow"
            };
            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "Europe/Moscow"
            };

            const formattedDate = new Intl.DateTimeFormat("ru-RU", dateOptions).format(now);
            const formattedTime = new Intl.DateTimeFormat("ru-RU", timeOptions).format(now);

            setCurrentTime(`${formattedDate} ${formattedTime}`);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <motion.div
            key={"profile"}
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className={"page page-profile"}>
            <div className="page-header">
                <span className="page-title page-title__name">123 </span>
                <span className="page-title__district">Группа BI-разработки • Разработчик</span>
                <div className="clocks"><span>{currentTime}</span></div>
            </div>
            <div className="widgets">
                <div className="widgets-head">
                    <div className="widget widget-notifications">
                        <div className="widget-header">
                            <span className="widget-title">Уведомления</span>
                        </div>
                        <div className="widget-body">
                            <ModuleNotifications />
                        </div>
                    </div>
                    <div className="right-widgets">
                        <div className="widget widget-documents">
                            <div className="widget-header">
                                <span className="widget-title">Документы</span>
                            </div>
                            <div className="widget-body">
                                <ModuleDocuments />
                            </div>
                        </div>
                        <div className="widget widget-tickets">
                            <div className="widget-header">
                                <span className="widget-title">Заявки</span>
                            </div>
                            <div className="widget-body"></div>
                        </div>
                    </div>
                </div>

                <button className="action">Крутая кнопка для открытия чего-либо</button>

                <div className="widget">
                    <div className="widget-header">
                        <span className="widget-title">Новости</span>
                    </div>
                    <div className="widget-body"></div>
                </div>
                <div className="widget">
                    <div className="widget-header">
                        <span className="widget-title">График отпусков</span>
                    </div>
                    <div className="widget-body"></div>
                </div>
            </div>
        </motion.div>
    );
};
