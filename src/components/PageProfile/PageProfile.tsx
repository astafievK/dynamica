import {FC, useEffect} from "react";
import {pageAnimation} from "../../motionSettins.ts";
import {motion} from "framer-motion";
import {ModuleDocuments} from "../ModuleDocuments/ModuleDocuments.tsx";
import {ModuleNotifications} from "../ModuleNotifications/ModuleNotifications.tsx";

export const PageProfile: FC = () => {
    useEffect(() => {
        document.title = "Профиль";
    })

    return (
        <motion.div
            key={"profile"}
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className={"page page-profile"}>
            <div className="page-header">
                <span className="page-title page-title__name">Астафьев Кирилл</span>
                <span className="page-title__district">Группа BI-разработки • Разработчик</span>
            </div>
            <div className="widgets">
                <div className="widgets-head">
                    <div className="widget widget-notifications">
                        <div className="widget-header">
                            <span className="widget-title">Уведомления</span>
                        </div>
                        <div className="widget-body">
                            <ModuleNotifications/>
                        </div>
                    </div>
                    <div className="right-widgets">
                        <div className="widget widget-documents">
                            <div className="widget-header">
                                <span className="widget-title">Документы</span>
                            </div>
                            <div className="widget-body">
                                <ModuleDocuments/>
                            </div>
                        </div>
                        <div className="widget widget-tickets">
                            <div className="widget-header">
                                <span className="widget-title">Заявки</span>
                            </div>
                            <div className="widget-body">

                            </div>
                        </div>
                    </div>
                </div>

                <button className="action">Крутая кнопка для открытия чего-либо</button>

                <div className="widget">
                    <div className="widget-header">
                        <span className="widget-title">Новости</span>
                    </div>
                    <div className="widget-body">

                    </div>
                </div>
                <div className="widget">
                    <div className="widget-header">
                        <span className="widget-title">График отпусков</span>
                    </div>
                    <div className="widget-body">

                    </div>
                </div>
            </div>
        </motion.div>
    )
}