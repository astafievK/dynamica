import {FC} from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { setModalNotificationsIsOpen as setNotificationsModalOpen } from "../../api/slices/modalNotificationsSlice.ts";
import { setIsOpen as setMobileMenuOpen } from "../../api/slices/mobileMenuSlice.ts";

import {Link, NavLink, useNavigate} from "react-router-dom";

export const Header: FC = () => {
    const { user } = useTypedSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (user) {
            navigate("/profile");
        } else {
            dispatch(setLoginModalOpen(true));
        }
    };

    const handleNotificationsClick = () => dispatch(setNotificationsModalOpen(true));
    const handleBurgerClick = () => dispatch(setMobileMenuOpen(true));

    return (
        <>
            <div className={`header-wrapper`}>
                <header>
                    <NavLink
                        to="/"
                        id={"logo"}>
                        <img loading={"lazy"} src="/logo.png" alt="динамика"/>
                    </NavLink>

                    <div className="page-title">
                        <span>Адресная книга</span>
                    </div>

                    <div className="profile-container">
                        <Link to={"documents"} className={"create-doc header-item"}>
                            Создать договор
                        </Link>
                        <button className="login header-item" onClick={() => dispatch(setLoginModalOpen(true))}>
                            Авторизация
                        </button>
                        <>
                            <button className="notifications-wrapper header-item" onClick={handleNotificationsClick}>
                                <div className="notifications-image"></div>
                            </button>
                            <Link to={"profile"} className="user-wrapper header-item">
                                <div className="user-image"></div>
                            </Link>
                        </>
                        {
                            user &&
                            <>
                                <div className="notifications-wrapper" onClick={handleNotificationsClick}>
                                    <span>Уведомления</span>
                                </div>
                                <div className="user-wrapper" onClick={handleProfileClick}>
                                    <div className="user-image"></div>
                                </div>
                            </>
                        }
                    </div>

                    <div className="burger" id="burger" onClick={handleBurgerClick}>
                        <div className="body">
                            <span className="line line-1"></span>
                            <span className="line line-2"></span>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};
