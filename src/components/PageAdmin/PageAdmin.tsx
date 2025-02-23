import { motion } from "framer-motion";
import {NavLink, Outlet} from "react-router-dom";
import {pageAnimation} from "../../motionSettins.ts";
import {FC, useEffect} from "react";

export const PageAdmin: FC = () => {
    useEffect(() => {
        document.title = "Панель управления";
    });

    return (
        <>
            <div className="page page-admin">
                <div className="page-header">
                    <span className="page-title page-title__name">Панель управления</span>
                </div>
                <nav className="page-admin__filters">
                    <NavLink to="feed" className={({ isActive }) => isActive ? "admin-tab active" : "admin-tab"}>Новости</NavLink>
                    <NavLink to="contacts" className={({ isActive }) => isActive ? "admin-tab active" : "admin-tab"}>Адресная книга</NavLink>
                    <NavLink to="documents" className={({ isActive }) => isActive ? "admin-tab active" : "admin-tab"}>Документы</NavLink>
                    <NavLink to="adaptation" className={({ isActive }) => isActive ? "admin-tab active" : "admin-tab"}>Адаптация</NavLink>
                </nav>
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    transition={pageAnimation.transition}
                    className="page-admin__content"
                >
                    <Outlet />
                </motion.div>
            </div>
        </>
    );
};
