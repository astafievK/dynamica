import {AnimatePresence, motion} from "framer-motion";
import { FC } from "react";
import {NavLink, useLocation} from "react-router-dom";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux.ts";
import {setIsOpen as setLoginModalOpen} from "../../api/slices/modalLoginSlice.ts";
import {logout} from "../../api/slices/authSlice.ts";

export const LeftMenu: FC = () => {
    const { user } = useTypedSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const isAdminPageOpened = location.pathname.startsWith("/admin");

    return (
        <>
            <aside className="left-menu">
                <NavLink to="/" className="logo-container"><img src={"/logo.svg"} alt={"Динамика"}/></NavLink>
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
                    <ul>
                        <li><NavLink to="/" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Главная</NavLink></li>
                        <li><NavLink to="/feed" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Новости</NavLink></li>
                        <li><NavLink to="/contacts" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item item-contacts" : ""}`}>Адресная книга</NavLink></li>
                        <li><NavLink to="/adaptation" className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}>Адаптация</NavLink></li>
                    </ul>
                </nav>
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
                {
                    /*
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
                     */
                }
            </aside>
        </>
    );
};
