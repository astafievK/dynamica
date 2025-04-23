import {AnimatePresence, motion} from "framer-motion";
import {FC, JSX} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {useTypedSelector} from "../../store/hooks/redux.ts";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

interface NavItem {
    title: string;
    path: string;
    icon: JSX.Element;
    isIgnore?: boolean;
}

const navItems: NavItem[] = [
    { title: "Главная", path: "/", icon: <HomeOutlinedIcon/>, isIgnore: true },
    { title: "Лента", path: "/feed", icon: <NewspaperOutlinedIcon/> },
    { title: "Адресная книга", path: "/contacts", icon: <ContactsOutlinedIcon/> },
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
                        <AdminPanelSettingsOutlinedIcon/>
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
                    {navItems
                        .filter(item => !item.isIgnore)
                        .map(({ title, path, icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) => `left-menu-item ${isActive ? "active-nav-item" : ""}`}
                            >
                                {icon}
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
            </aside>
        </>
    );
};