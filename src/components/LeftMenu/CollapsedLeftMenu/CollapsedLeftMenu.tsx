import { FC } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../../constants/navItems.tsx";
import "./CollapsedLeftMenu.css";

export const CollapsedLeftMenu: FC = () => {
    return (
        <nav className="general-navigation left-menu-navigation">
            <div className="left-menu-navigation__items">
                {navItems.map(({ path, icon }) => {
                    const currentPath = location.pathname;

                    let isActive = false;

                    if (path === "/") {
                        // "Лента" активна для / и всего что начинается с /feed
                        isActive = currentPath === "/" || currentPath.startsWith("/feed");
                    } else {
                        // Остальные — активны, если path строго равен currentPath или path — префикс
                        isActive =
                            currentPath === path || currentPath.startsWith(path + "/");
                    }

                    return (
                        <NavLink
                            key={path}
                            to={path}
                            className={`left-menu-item ${isActive ? "active-nav-item" : ""}`}
                        >
                            {icon}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
};
