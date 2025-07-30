import React, { useEffect, useRef, useState } from "react";
import "./CustomMenu.css";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {AnimatePresence, motion} from "framer-motion";
import {createPortal} from "react-dom";

interface CustomMenuProps {
    children: React.ReactNode;
}

export const CustomMenu: React.FC<CustomMenuProps> = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleDocumentClick = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
    }, [menuOpen]);

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("mousedown", handleDocumentClick);
        } else {
            document.removeEventListener("mousedown", handleDocumentClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, [menuOpen]);

    return (
        <div className={`custom-menu`}>
            <button
                className="custom-menu__button"
                ref={buttonRef}
                onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen((prev) => !prev);
                }}
            >
                {
                    menuOpen ?
                        <CloseRoundedIcon/> :
                        <MoreVertRoundedIcon />
                }
            </button>

            {createPortal(
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            className="custom-menu__items"
                            ref={menuRef}
                            role="menu"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.1 }}
                            style={{
                                position: "absolute",
                                top: menuPosition.top + 5,
                                left: menuPosition.left,
                                zIndex: 1000,
                            }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};
