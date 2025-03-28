import {AnimatePresence, motion} from "framer-motion";
import { FC } from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {useTypedSelector} from "../../store/hooks/redux.ts";

interface NavItem {
    title: string;
    path: string;
}

const navItems: NavItem[] = [
    { title: "Главная", path: "/" },
    { title: "Лента", path: "/feed" },
    { title: "Адресная книга", path: "/contacts" },
    { title: "Адаптация", path: "/adaptation" }
];

export const LeftMenu: FC = () => {
    const {history} = useTypedSelector((state) => state.history)
    const location = useLocation();
    const isAdminPageOpened = location.pathname.startsWith("/admin");

    return (
        <>
            <aside className="left-menu">
                <div className="logo-container">
                    <Link className={"logo-link"} to="/">
                        <div className="logo"></div>
                    </Link>
                </div>
                <div className="admin-container">
                    <NavLink to="/admin/feed" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>
                        Администрирование
                    </NavLink>
                    <AnimatePresence>
                        {isAdminPageOpened && (
                            <motion.nav
                                className="admin-navigation submenu-container"
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
                    {navItems.map(({ title, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `left-menu-item ${isActive ? "active-nav-item" : ""}`
                            }
                        >
                            {title}
                        </NavLink>
                    ))}
                </nav>
                <nav className="recent-navigation">
                    <span className="navigation-title">Последние страницы</span>
                    {history.map((item) => (
                        <NavLink key={item.path} to={item.path} className={`left-menu-item`}>
                            {item.title}
                        </NavLink>
                    ))}
                </nav>
                {
                    /*
                    <div className="profile-container">
                    {user && (
                        <motion.div
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.4 }}
                            className="user-actions">
                            <NavLink to="/profile" className={({ isActive }) => `user-action user-action-profile ${isActive ? "active" : ""}`}>
                                <img src={"/user-icon.svg"} alt={""}/>
                                <div className="banner">
                                    <span>{user.first_name} {user.last_name}</span>
                                </div>
                            </NavLink>
                            <button className="user-action user-action-notifications">
                                <img src={"/notifications-icon.svg"} alt={""}/>
                                <div className="banner">
                                    <span>Уведомления</span>
                                </div>
                            </button>
                            <button className="user-action user-action-logout" onClick={() => dispatch(logout())}>
                                <img src={"/logout-icon.svg"} alt={""}/>
                                <div className="banner">
                                    <span>Выход</span>
                                </div>
                            </button>
                        </motion.div>
                    )}
                    {
                        !user &&
                        <motion.button
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.4 }}
                            className={`left-menu-item`}
                            onClick={() => dispatch(setLoginModalOpen(true))}>
                            Авторизация
                        </motion.button>
                    }
                </div>
                     */
                }
                {
                    /*
                    <div className="sep"></div>


                     */
                }
            </aside>
        </>
    );
};