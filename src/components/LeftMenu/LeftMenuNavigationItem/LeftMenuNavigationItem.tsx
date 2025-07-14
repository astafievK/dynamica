import React from "react";
import { NavLink } from "react-router-dom";

interface ILeftMenuNavigationItemProps {
    label: string;
    linkTo: string;
    icon?: React.ReactNode;
    classNames?: string[];
    action?: {
        icon: React.ReactNode;
        title: string;
        onClick?: (e: React.MouseEvent) => void;
    }
}

export const LeftMenuNavigationItem: React.FC<ILeftMenuNavigationItemProps> = ({
                                                               label,
                                                               linkTo,
                                                               icon,
                                                               action
                                                           }) => {

    return (
        <NavLink to={linkTo} className="left-menu-navigation__item">
            {icon && <span className="icon">{icon}</span>}
            <span className="label">{label}</span>

            {action && (
                <button
                    className="action-button"
                    title={action.title}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        action.onClick?.(e);
                    }}
                >
                    {action.icon}
                </button>
            )}
        </NavLink>
    );
};
