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
                                isActive ? 'active-nav-item' : ''
                            }
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                isActive ? 'active-nav-item' : ''
                            }
                        >
                            Адресная книга
                        </NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                isActive ? 'active-nav-item' : ''
                            }
                        >
                            Документы
                        </NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink
                            to="/feed"
                            className={({isActive}) =>
                                isActive ? 'active-nav-item' : ''
                            }
                        >
                            Адаптация
                        </NavLink>
                    </li>
                    <li className={"nav-item"}>
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                isActive ? 'active-nav-item' : ''
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
                                to="/"
                                className={({isActive}) =>
                                    isActive ? 'active-faq-item' : ''
                                }
                            >
                                Политика 1
                            </NavLink>
                        </li>
                        <li className={"faq-item"}>
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    isActive ? 'active-faq-item' : ''
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
                            to="/"
                            className={({isActive}) =>
                                isActive ? 'active-faq-item' : ''
                            }
                        >
                            Политика 1
                        </NavLink>
                    </li>
                    <li className={"faq-item"}>
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                isActive ? 'active-faq-item' : ''
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
