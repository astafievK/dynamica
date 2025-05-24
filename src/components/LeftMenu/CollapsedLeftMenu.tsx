import { FC } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../constants/navItems";

export const CollapsedLeftMenu: FC = () => {
    return (
        <nav className="general-navigation">
            {navItems.map(({ path, icon }) => (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        `left-menu-item ${isActive ? "active-nav-item" : ""}`
                    }
                >
                    {icon}
                </NavLink>
            ))}
        </nav>
    );
};
