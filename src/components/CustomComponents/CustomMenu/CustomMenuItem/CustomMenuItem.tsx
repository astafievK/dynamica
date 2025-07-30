import React from "react";
import "./CustomMenuItem.css";

interface CustomMenuItemProps {
    onClick: () => void;
    children: React.ReactNode;
}

export const CustomMenuItem: React.FC<CustomMenuItemProps> = ({ onClick, children }) => {
    return (
        <div className="custom-menu-item" onClick={onClick}>
            {children}
        </div>
    );
};
