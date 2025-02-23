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
                            to="/document"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Подписание документа (послед.)
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/document_par"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Подписание документа (пар.)
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};
