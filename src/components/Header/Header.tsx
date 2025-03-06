import {FC} from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { setModalNotificationsIsOpen as setNotificationsModalOpen } from "../../api/slices/modalNotificationsSlice.ts";
import { setIsOpen as setMobileMenuOpen } from "../../api/slices/mobileMenuSlice.ts";

import {NavLink, useNavigate} from "react-router-dom";
import {NavGeneral} from "../NavGeneral/NavGeneral.tsx";

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

                    <NavGeneral/>

                    <div className="profile-container">
                        <div className="profile-wrapper" onClick={handleProfileClick}>
                            <span>{user ? `${user.first_name} ${user.last_name}` : "Авторизация"}</span>
                        </div>

                        {
                            user &&
                            <div className="notifications-wrapper" onClick={handleNotificationsClick}>
                                <span>Уведомления</span>
                            </div>
                        }
                    </div>

                    <div className="burger" id="burger" onClick={handleBurgerClick}>
                        <div className="body">
                            <span className="line line-1"></span>
                            <span className="line line-2"></span>
                        </div>
                    </div>
                </header>
                <div className="user-panel">
                    <nav>
                        <NavLink
                            to="/profile">
                            Профиль
                        </NavLink>
                        <NavLink
                            to="/my-profile">
                            Документы
                        </NavLink>
                        <NavLink
                            to="/my-notifications">
                            Уведомления
                        </NavLink>
                    </nav>
                </div>
            </div>
        </>
    );
};
