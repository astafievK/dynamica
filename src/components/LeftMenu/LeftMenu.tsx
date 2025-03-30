import {AnimatePresence, motion} from "framer-motion";
import { FC } from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {useTypedSelector} from "../../store/hooks/redux.ts";
import { MdDynamicFeed, MdContacts } from "react-icons/md";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

interface NavItem {
    title: string;
    path: string;
    icon: JSX.Element;
}

const navItems: NavItem[] = [
    { title: "Главная", path: "/", icon: <HomeRoundedIcon fontSize="large" /> },
    { title: "Лента", path: "/feed", icon: <MdDynamicFeed size={25} /> },
    { title: "Адресная книга", path: "/contacts", icon: <MdContacts size={25} /> },
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
                    <NavLink
                        key={"/admin"}
                        to={"/admin"}
                        className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}
                    >
                        <AdminPanelSettingsRoundedIcon fontSize="large" /> <span>Администрирование</span>
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
                    {navItems.map(({ title, path, icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}
                        >
                            {icon} <span>{title}</span>
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
            </aside>
        </>
    );
};