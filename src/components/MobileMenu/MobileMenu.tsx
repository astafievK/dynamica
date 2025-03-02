import { FC, useEffect, useState } from "react";
import { setIsOpen } from "../../api/slices/mobileMenuSlice.ts";
import { useAppDispatch, useTypedSelector } from "../../store/hooks/redux.ts";
import { NavLink } from "react-router-dom";
import { logout } from "../../api/slices/authSlice.ts";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import {Cross} from "../Cross/Cross.tsx";
import { setModalNotificationsIsOpen } from "../../api/slices/modalNotificationsSlice.ts";

export const MobileMenu: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useTypedSelector((state) => state.mobileMenuReducer.mobileMenuIsOpen);

    const { user } = useTypedSelector(state => state.auth);
    const [isClosing, setIsClosing] = useState(false);
    const [showBody, setShowBody] = useState(false);

    const menuItems = [
        { path: "/", title: "Главная", class: "landing" },
        { path: "/feed", title: "Новости", class: "feed" },
        { path: "/contacts", title: "Адресная книга", class: "contacts" },
        { path: "/documents", title: "Документы", class: "documents" },
        { path: "/adaptation", title: "Адаптация", class: "adaptation" }
    ];

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
            }, 280);
        }
    }, [isOpen]);

    if (!isOpen && !isClosing) return null;

    return (
        <div id="mobileMenu" className={isClosing ? "hidden" : ""}>
            <div className={`content ${isClosing ? "hidden" : ""}`}>
                <div className="header">
                    <div className="logo">
                        <img loading={"lazy"} src="/logo.png" alt="динамика" />
                    </div>
                    {
                        user && (
                            <button className="notifications" onClick={() => dispatch(setModalNotificationsIsOpen(true))}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M9 17.5V18.5C9 20.1569 10.3431 21 12 21C13.6569 21 15 20.1569 15 18.5V17.5M5.99999 8.5C5.99999 5.18629 8.68628 3.5 12 3.5C15.3137 3.5 18 5.18629 18 8.5C18 10.4392 18.705 12.6133 19.4316 14.3389C20.0348 15.7717 19.0222 17.5 17.4676 17.5H6.53237C4.97778 17.5 3.96518 15.7717 4.56842 14.3389C5.29493 12.6133 5.99999 10.4392 5.99999 8.5Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                            </button>
                        )
                    }
                    <Cross onClick={() => handleClose()} color={"#FFFFFF"} />
                </div>

                <div className={`body ${showBody ? "visible" : ""}`}>
                    <nav>
                        <ul className="nav">
                            {menuItems.map(({ path, title, class: classname }) => (
                                <li key={path} className={`nav-item nav-item-${classname}`}>
                                    <NavLink to={path} className={({ isActive }) => (isActive ? "active-nav-item" : "")} onClick={handleClose}>
                                        {title}
                                    </NavLink>
                                </li>
                            ))}

                            {/* Пункт /profile при выполненной авторизации */}
                            {user && (
                                <li key="/profile" className="nav-item nav-item-profile">
                                    <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-nav-item" : "")} onClick={handleClose}>
                                        Профиль
                                        <span className="username">{user.first_name} {user.last_name}</span>
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>

                    {user ? (
                        <button className="logout-btn" onClick={() => dispatch(logout())}>
                            Выйти из аккаунта
                        </button>
                    ) : (
                        <button className="login-btn" onClick={() => dispatch(setLoginModalOpen(true))}>
                            Войти
                        </button>
                    )}
                </div>
            </div>
            <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
        </div>
    );
};
