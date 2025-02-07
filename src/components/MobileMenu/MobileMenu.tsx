import { FC, useEffect, useState } from "react";
import { setIsOpen } from "../../api/slices/mobileMenuSlice.ts";
import { useAppDispatch, useTypedSelector } from "../../store/hooks/redux.ts";
import { NavLink } from "react-router-dom";

export const MobileMenu: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useTypedSelector((state) => state.mobileMenuReducer.mobileMenuIsOpen);
    const [isClosing, setIsClosing] = useState(false);
    const [showBody, setShowBody] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            dispatch(setIsOpen(false));
            setIsClosing(false);
            setShowBody(false);
        }, 250);
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setShowBody(true);
            }, 250);
        }
    }, [isOpen]);

    if (!isOpen && !isClosing) return null;

    return (
        <div id="mobileMenu" className={isClosing ? "hidden" : ""}>
            <div className={`content ${isClosing ? "hidden" : ""}`}>
                <div className="header">
                    <div className="logo">
                        <img src="logo.png" alt="динамика" />
                    </div>
                    <div className="cross" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFFFFF" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>
                <div className={`body ${showBody ? "visible" : ""}`}>
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? "active-nav-item" : "")}
                                onClick={handleClose}
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/feed"
                                className={({ isActive }) => (isActive ? "active-nav-item" : "")}
                                onClick={handleClose}
                            >
                                Новости
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? "active-nav-item" : "")}
                                onClick={handleClose}
                            >
                                Адресная книга
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? "active-nav-item" : "")}
                                onClick={handleClose}
                            >
                                Документы
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? "active-nav-item" : "")}
                                onClick={handleClose}
                            >
                                Адаптация
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
        </div>
    );
};
