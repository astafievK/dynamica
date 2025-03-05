import { FC } from "react";
import {NavLink} from "react-router-dom";

export const LeftMenu: FC = () => {
    return (
        <>
            <aside className="left-menu">
                <NavLink
                    to="/"
                    className="logo-container">
                    <img src={"/logo.png"} alt={"Динамика"}/>
                </NavLink>
                <NavLink
                    to="/profile"
                    className="profile-container left-menu-item">
                    Кирилл Астафьев
                </NavLink>
                <NavLink
                    to="/profile"
                    className="admin-container left-menu-item">
                    Панель администрирования
                </NavLink>
                <nav className="general-navigation">
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            isActive ? 'left-menu-item nav-item active-nav-item' : 'left-menu-item nav-item'
                        }
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        to="/feed"
                        className={({isActive}) =>
                            isActive ? 'left-menu-item nav-item active-nav-item' : 'left-menu-item nav-item'
                        }
                    >
                        Новости
                    </NavLink>
                    <NavLink
                        to="/contacts"
                        className={({isActive}) =>
                            isActive ? 'left-menu-item nav-item active-nav-item' : 'left-menu-item nav-item'
                        }
                    >
                        Адресная книга
                    </NavLink>
                    <NavLink
                        to="/adaptation"
                        className={({isActive}) =>
                            isActive ? 'left-menu-item nav-item active-nav-item' : 'left-menu-item nav-item'
                        }
                    >
                        Адаптация
                    </NavLink>
                </nav>
                <div className="sep"></div>
                <nav className="recent-navigation">
                    <NavLink
                        to="/recent-page-1"
                        className={({isActive}) =>
                            isActive ? 'left-menu-item nav-item active-nav-item' : 'left-menu-item nav-item'
                        }
                    >
                        Последняя вкладка 1
                    </NavLink>
                    <NavLink
                        to="/recent-page-2"
                        className={({isActive}) =>
                            isActive ? 'left-menu-item nav-item active-nav-item' : 'left-menu-item nav-item'
                        }
                    >
                        Последняя вкладка 2
                    </NavLink>
                    <NavLink
                        to="/recent-page-3"
                        className={({isActive}) =>
                            isActive ? 'left-menu-item nav-item active-nav-item' : 'left-menu-item nav-item'
                        }
                    >
                        Последняя вкладка 3
                    </NavLink>
                    <NavLink
                        to="/recent-page-4"
                        className={({isActive}) =>
                            isActive ? 'left-menu-item nav-item active-nav-item' : 'left-menu-item nav-item'
                        }
                    >
                        Последняя вкладка 4
                    </NavLink>
                    <NavLink
                        to="/recent-page-5"
                        className={({isActive}) =>
                            isActive ? 'left-menu-item nav-item active-nav-item' : 'left-menu-item nav-item'
                        }
                    >
                        Последняя вкладка 5
                    </NavLink>
                </nav>
            </aside>
        </>
    );
};
