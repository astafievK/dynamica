import { FC } from "react";
import {NavLink} from "react-router-dom";

export const Footer: FC = () => {
    return (
        <div className="footer-wrapper">
            <footer>
                <ul className={'nav'}>
                    <li className={"nav-item"}>
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink
                            to="/contacts"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Адресная книга
                        </NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink
                            to="/documents"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Документы
                        </NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink
                            to="/adoptation"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Адаптация
                        </NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink
                            to="/profile"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Личный кабинет
                        </NavLink>
                    </li>
                </ul>
                <div className="sep"></div>
                <div className="logo-faq">
                    <div className="logo">
                        <img src="logo.png" alt="динамика"/>
                    </div>
                    <ul className={'faq'}>
                        <li className={"faq-item"}>
                            <NavLink
                                to="/faq1"
                                className={({isActive}) =>
                                    isActive ? 'active-faq-item' : 'faq-item'
                                }
                            >
                                Политика 1
                            </NavLink>
                        </li>
                        <li className={"faq-item"}>
                            <NavLink
                                to="/faq2"
                                className={({isActive}) =>
                                    isActive ? 'active-faq-item' : 'faq-item'
                                }
                            >
                                Политика 2
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="logo">
                    <img src="logo.png" alt="динамика"/>
                </div>
                <ul className={'faq'}>
                    <li className={"faq-item"}>
                        <NavLink
                            to="/faq1"
                            className={({isActive}) =>
                                isActive ? 'active-faq-item' : 'faq-item'
                            }
                        >
                            Политика 1
                        </NavLink>
                    </li>
                    <li className={"faq-item"}>
                        <NavLink
                            to="/faq2"
                            className={({isActive}) =>
                                isActive ? 'active-faq-item' : 'faq-item'
                            }
                        >
                            Политика 2
                        </NavLink>
                    </li>
                </ul>
            </footer>
        </div>
    );
};
