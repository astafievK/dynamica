import {AnimatePresence, motion} from "framer-motion";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const LeftMenu: FC = () => {
    const location = useLocation();
    const isAdminPageOpened = location.pathname.startsWith("/admin");

    return (
        <>
            <aside className="left-menu">
                <NavLink to="/" className="logo-container"><img src={"/logo.png"} alt={"Динамика"}/></NavLink>
                <NavLink to="/profile" className="profile-container left-menu-item">Кирилл Астафьев</NavLink>
                <div className="admin-container">
                    <NavLink to="/admin" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>
                        Панель администрирования
                    </NavLink>
                    <AnimatePresence>
                        {isAdminPageOpened && (
                            <motion.nav
                                className="admin-navigation"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <ul>
                                    <li><NavLink to="/admin/feed" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Новости</NavLink></li>
                                    <li><NavLink to="/admin/contacts" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Адресная книга</NavLink></li>
                                    <li><NavLink to="/admin/documents" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Документы</NavLink></li>
                                    <li><NavLink to="/admin/adaptation" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Адаптация</NavLink></li>
                                </ul>
                            </motion.nav>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="general-navigation">
                    <ul>
                        <li><NavLink to="/" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Главная</NavLink></li>
                        <li><NavLink to="/feed" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Новости</NavLink></li>
                        <li><NavLink to="/contacts" className={({ isActive })=> `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Адресная книга</NavLink></li>
                        <li><NavLink to="/adaptation" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Адаптация</NavLink></li>
                    </ul>
                </nav>

                <div className="sep"></div>

                <nav className="recent-navigation">
                    <span className="navigation-title">Последние страницы</span>
                    <ul>
                        <li><NavLink to="/recent-page-1" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Последняя вкладка 1</NavLink></li>
                        <li><NavLink to="/recent-page-2" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Последняя вкладка 2</NavLink></li>
                        <li><NavLink to="/recent-page-3" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Последняя вкладка 3</NavLink></li>
                        <li><NavLink to="/recent-page-4" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Последняя вкладка 4</NavLink></li>
                        <li><NavLink to="/recent-page-5" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Последняя вкладка 5</NavLink></li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};
