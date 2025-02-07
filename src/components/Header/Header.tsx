import { FC } from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { setIsOpen as setNotificationsModalOpen } from "../../api/slices/modalNotificationsSlice.ts";
import { setIsOpen as setMobileMenuOpen } from "../../api/slices/mobileMenuSlice.ts";

import {NavLink, useNavigate} from "react-router-dom";

export const Header: FC = () => {
    const {user} = useTypedSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleProfileClick = () => {
        if(user) {
            navigate("/profile");
        } else {
            dispatch(setLoginModalOpen(true));
        }
    }
    const handleNotificationsClick = () => dispatch(setNotificationsModalOpen(true))
    const handleBurgerClick = () => dispatch(setMobileMenuOpen(true))

    return (
        <div className={"header-wrapper"}>
            <header>
                <NavLink
                    to="/"
                    id={"logo"}>
                    <img src="logo.png" alt="динамика"/>
                </NavLink>
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
                                to="/"
                                className={({isActive}) =>
                                    isActive ? 'nav-item active-nav-item' : 'nav-item'
                                }
                            >
                                Адресная книга
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    isActive ? 'nav-item active-nav-item' : 'nav-item'
                                }
                            >
                                Документы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    isActive ? 'nav-item active-nav-item' : 'nav-item'
                                }
                            >
                                Адаптация
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="profile-container">
                    <div className="profile-wrapper" onClick={handleProfileClick}>
                        <div className="user-logo__container logo-container">
                            <img className="user-logo" src="user-icon.png" alt="" />
                        </div>
                        <span>{user ? `${user.first_name} ${user.last_name}` : "Войти"}</span>
                    </div>

                    <div className="notifications-wrapper" onClick={handleNotificationsClick}>
                        <div className="notifications-logo__container logo-container">
                            <img className="notifications-logo" src={"notifications-icon.svg"} alt={""}/>
                        </div>
                    </div>
                </div>

                <div className="burger" id="burger" onClick={handleBurgerClick}>
                    <div className="body">
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                    </div>
                </div>
            </header>
        </div>
    );
};
