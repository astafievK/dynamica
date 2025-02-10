import { FC } from "react";
import {NavLink} from "react-router-dom";

export const NavGeneral: FC = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/feed"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Новости
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contacts"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Адресная книга
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/documents"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Документы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/adaptation"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Адаптация
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};
