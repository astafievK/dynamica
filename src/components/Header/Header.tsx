import {FC} from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { setModalNotificationsIsOpen as setNotificationsModalOpen } from "../../api/slices/modalNotificationsSlice.ts";
import { setIsOpen as setMobileMenuOpen } from "../../api/slices/mobileMenuSlice.ts";
import {Link, NavLink, useLocation} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {PAGE_TITLES} from "../../constants/routes.ts";
import { MdNotificationsNone, MdNoteAdd } from "react-icons/md";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

export const Header: FC = () => {
    const { user } = useTypedSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const currentTitle = PAGE_TITLES[location.pathname] || "Неизвестная страница";

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

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.17, ease: "easeInOut" }}
                            className="page-title"
                        >
                            <span>{currentTitle}</span>
                        </motion.div>
                    </AnimatePresence>

                    <div className="profile-container">
                        {
                            !user &&
                            <>
                                <Link to={"documents"} className="create-doc header-item">
                                    <MdNoteAdd size={30} /> <span>Создать / Загрузить договор</span>
                                </Link>
                                <button className="notifications-btn header-item" onClick={handleNotificationsClick}>
                                    <MdNotificationsNone  size={30} />
                                </button>
                                <Link to={"profile"} className="user-wrapper header-item">
                                    <div className="user-image"></div>
                                    <span>Астафьев Кирилл</span>
                                </Link>

                                <button className="login-btn header-item" onClick={() => dispatch(setLoginModalOpen(true))}>
                                    <LoginRoundedIcon fontSize={"large"} />
                                </button>
                            </>
                        }
                        {
                            user &&
                            <>
                                <Link to={"documents"} className="create-doc header-item">
                                    <MdNoteAdd size={30} /> <span>Создать / Загрузить договор</span>
                                </Link>
                                <button className="notifications-btn header-item" onClick={handleNotificationsClick}>
                                    <MdNotificationsNone  size={30} />
                                </button>
                                <Link to={"profile"} className="user-wrapper header-item">
                                    <div className="user-image"></div>
                                    <span>{user.first_name} {user.last_name}</span>
                                </Link>
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
