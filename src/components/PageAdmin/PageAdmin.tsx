import { FC } from "react";
import {NavLink, Outlet} from "react-router-dom";

export const PageAdmin: FC = () => {
    return (
        <>
            <div className="page page-admin">
                <div className="menu">
                    <nav>
                        <NavLink
                            to="/admin/feed"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Новости
                        </NavLink>
                        <NavLink
                            to="/admin/contacts"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Адресная книга
                        </NavLink>
                        <NavLink
                            to="/admin/docs"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Документы
                        </NavLink>
                        <NavLink
                            to="/admin/tests"
                            className={({isActive}) =>
                                isActive ? 'nav-item active-nav-item' : 'nav-item'
                            }
                        >
                            Адаптация
                        </NavLink>
                    </nav>
                </div>
                <div className="content">
                    {
                        <Outlet />
                    }
                </div>
            </div>
        </>
    );
};
