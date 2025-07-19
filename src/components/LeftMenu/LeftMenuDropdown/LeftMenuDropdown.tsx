import React, { useState } from "react";
import "./LeftMenuDropdown.css";
import {AnimatePresence, motion} from "framer-motion";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';

interface ILeftMenuDropdownProps {
    label: string;
    icon?: React.ReactNode;
    classNames?: string[];
    items: React.ReactNode[];
}

export const LeftMenuDropdown: React.FC<ILeftMenuDropdownProps> = ({
                                                                       label,
                                                                       icon,
                                                                       classNames = [],
                                                                       items
                                                                   }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <nav className={`left-menu-dropdown left-menu-navigation ${classNames.join(" ")}`}>
            <div
                className={`left-menu-navigation__item dropdown-header ${isOpen ? "active" : ""}`}
                onClick={toggleDropdown}
            >
                {icon && <span className="icon">{icon}</span>}
                <span className="label">{label}</span>
                {isOpen ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        animate={{height: "auto"}}
                        initial={{ height: "0px" }}
                        exit={{ height: "0px" }}
                        transition={{ duration: 0.2}}
                        className="left-menu-dropdown-items">
                        {items.map((item, index) => (
                            <React.Fragment key={index}>{item}</React.Fragment>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
