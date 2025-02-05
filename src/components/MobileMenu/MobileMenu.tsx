import {FC, useEffect, useState} from "react";
import {setIsOpen} from "../../api/slices/mobileMenuSlice.ts";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux.ts";
import {NavLink} from "react-router-dom";

export const MobileMenu: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useTypedSelector((state) => state.mobileMenuReducer.mobileMenuIsOpen);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            dispatch(setIsOpen(false));
            setIsClosing(false);
        }, 400);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    if (!isOpen && !isClosing) return null;


    return(
        <div className={isClosing ? "hidden" : ""} id="mobileMenu">
            <div className={`content ${isClosing ? "hidden" : ""}`}>
                <div className="header">
                    <div className="logo">
                        <img src="logo.png" alt="динамика"/>
                    </div>
                    <div className="cross" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFFFFF" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>
                <div className="body">
                    <ul className={'nav'}>
                        <li className={"nav-item"}>
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    isActive ? 'active-nav-item' : ''
                                }
                                onClick={handleClose}
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink
                                to="/feed"
                                className={({isActive}) =>
                                    isActive ? 'active-nav-item' : ''
                                }
                                onClick={handleClose}
                            >
                                Новости
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink
                                to="/feed"
                                className={({isActive}) =>
                                    isActive ? 'active-nav-item' : ''
                                }
                                onClick={handleClose}
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink
                                to="/feed"
                                className={({isActive}) =>
                                    isActive ? 'active-nav-item' : ''
                                }
                                onClick={handleClose}
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink
                                to="/feed"
                                className={({isActive}) =>
                                    isActive ? 'active-nav-item' : ''
                                }
                                onClick={handleClose}
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink
                                to="/feed"
                                className={({isActive}) =>
                                    isActive ? 'active-nav-item' : ''
                                }
                                onClick={handleClose}
                            >
                                Главная
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
        </div>
    )
}