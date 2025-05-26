import { FC } from "react";
import { NavLink } from "react-router-dom";
//import { useTypedSelector } from "../../store/hooks/redux";
import { navItems } from "../../constants/navItems";
import { AnimatePresence, motion } from "framer-motion";

interface ExpandedLeftMenuProps {
    isExpanded: boolean;
}

export const ExpandedLeftMenu: FC<ExpandedLeftMenuProps> = ({ isExpanded }) => {
    //const { history } = useTypedSelector(state => state.history);

    return (
        <>
            <nav className="general-navigation">
                {navItems.map(({ title, path, icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `left-menu-item ${isActive ? "active-nav-item" : ""}`
                        }
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
                ))}
            </nav>

            {
                /*
               <AnimatePresence mode="wait">
                {isExpanded && (
                    <motion.nav
                        key="recent-nav"
                        className="recent-navigation"
                        initial={{ opacity: 0, y: -25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -25 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                    >
                        <span className="navigation-title">Последние страницы</span>
                        {history.map(item => (
                            <NavLink key={item.path} to={item.path} className="left-menu-item">
                                {item.title}
                            </NavLink>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
                 */
            }


        </>
    );
};
