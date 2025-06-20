import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../../../constants/navItems.tsx";
import { AnimatePresence, motion } from "framer-motion";
import "./ExpandedLeftMenu.css";
import { pageAnimation } from "../../../constants/motionSettings.ts";
import { useHasPermission } from "../../../store/hooks/useHasPermission.ts";
import { Permissions } from "../../../constants/permissions.ts";
import { ROUTES } from "../../../constants/routes.ts";

interface ExpandedLeftMenuProps {
    isExpanded: boolean;
}

export const ExpandedLeftMenu: FC<ExpandedLeftMenuProps> = ({ isExpanded }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isNavItemActive = (targetPath: string) =>
        currentPath === targetPath || currentPath.startsWith(targetPath + "/");

    const isAdminMenuEnabled = useHasPermission(
        [
            Permissions.Developer,
            Permissions.UpdateUsers,
            Permissions.Superuser,
            Permissions.CreateUpdateNews,
        ],
        "any"
    );

    const canViewContacts = useHasPermission(
        [Permissions.UpdateUsers, Permissions.Superuser, Permissions.Developer],
        "any"
    );

    const canViewFeed = useHasPermission(
        [Permissions.CreateUpdateNews, Permissions.Superuser, Permissions.Developer],
        "any"
    );

    const canViewDocuments = useHasPermission(
        [Permissions.DocumentApprover, Permissions.Superuser, Permissions.Developer],
        "any"
    );

    return (
        <>
            <nav className="general-navigation left-menu-navigation">
                <div className="left-menu-navigation__items">
                    {navItems.map(({ title, path, icon }) => {
                        const isActive =
                            path === "/"
                                ? currentPath === "/" || currentPath.startsWith("/feed")
                                : isNavItemActive(path);

                        return (
                            <NavLink
                                key={path}
                                to={path}
                                className={`left-menu-item ${isActive ? "active-nav-item" : ""}`}
                            >
                                {icon}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.span
                                            className="menu-text"
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.15, ease: "easeInOut" }}
                                        >
                                            {title}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            <AnimatePresence>
                {isExpanded && isAdminMenuEnabled && (
                    <motion.div
                        {...pageAnimation}
                        className="admin-navigation left-menu-navigation"
                    >
                        <span className="left-menu-navigation__title">Администрирование</span>
                        <div className="left-menu-navigation__items">
                            {canViewContacts && (
                                <NavLink
                                    to={ROUTES.ADMIN_CONTACTS}
                                    className={`left-menu-item ${isNavItemActive(ROUTES.ADMIN_CONTACTS) ? "active-nav-item" : ""}`}
                                >
                                    <span className="menu-text">Отделы</span>
                                </NavLink>
                            )}
                            {canViewFeed && (
                                <NavLink
                                    to={ROUTES.ADMIN_FEED}
                                    className={`left-menu-item ${isNavItemActive(ROUTES.ADMIN_FEED) ? "active-nav-item" : ""}`}
                                >
                                    <span className="menu-text">Новости</span>
                                </NavLink>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isExpanded && canViewDocuments && (
                    <motion.div
                        {...pageAnimation}
                        className="documents-navigation left-menu-navigation"
                    >
                        <span className="left-menu-navigation__title">Документооборот</span>
                        <div className="left-menu-navigation__items">
                            <NavLink
                                to={ROUTES.DOCUMENTS}
                                className={`left-menu-item ${isNavItemActive(ROUTES.DOCUMENTS) ? "active-nav-item" : ""}`}
                            >
                                <span className="menu-text">Все документы</span>
                            </NavLink>
                            <NavLink
                                to={ROUTES.DOCUMENT_PARALLEL}
                                className={`left-menu-item ${isNavItemActive(ROUTES.DOCUMENT_PARALLEL) ? "active-nav-item" : ""}`}
                            >
                                <span className="menu-text">Тест | Пар. документ</span>
                            </NavLink>
                            <NavLink
                                to={ROUTES.DOCUMENT}
                                className={`left-menu-item ${isNavItemActive(ROUTES.DOCUMENT) ? "active-nav-item" : ""}`}
                            >
                                <span className="menu-text">Тест | Посл. документ</span>
                            </NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
