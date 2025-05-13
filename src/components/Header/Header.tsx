import {FC} from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { setModalNotificationsIsOpen as setNotificationsModalOpen } from "../../api/slices/modalNotificationsSlice.ts";
import { setIsOpen as setMobileMenuOpen } from "../../api/slices/mobileMenuSlice.ts";
import {Link, NavLink} from "react-router-dom";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import {logout} from "../../api/slices/authSlice.ts";
import {useCreateDocument} from "../Contexts/CreateDocumentContext/CreateDocumentContext.tsx";

export const Header: FC = () => {
    const {user} = useTypedSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { openModal } = useCreateDocument();

    const handleNotificationsClick = () => dispatch(setNotificationsModalOpen(true));
    const handleBurgerClick = () => dispatch(setMobileMenuOpen(true));

    return (
        <>
            <div className={`header-wrapper`}>
                <header>
                    <NavLink
                        to="/"
                        id={"logo"}>
                        <img loading={"lazy"} src="/logo.svg" alt="динамика"/>
                    </NavLink>

                    {
                        /*
                        <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 10}}
                            transition={{duration: 0.17, ease: "easeInOut"}}
                            className="page-title"
                        >
                            <span>{currentTitle}</span>
                        </motion.div>
                    </AnimatePresence>
                         */
                    }

                    <div className="profile-container">
                        {
                            !user &&
                            <>
                                <button className="login-btn header-item"
                                        onClick={() => dispatch(setLoginModalOpen(true))}>
                                    <LoginRoundedIcon fontSize={"large"}/>
                                </button>
                            </>
                        }
                        {
                            user &&
                            <>
                                <Link to={"admin/contacts"} className="admin-panel-btn header-item">
                                    <AdminPanelSettingsOutlinedIcon/>
                                    <span>Администрирование</span>
                                </Link>
                                <button className="create-doc header-item" onClick={openModal}>
                                    <NoteAddOutlinedIcon/>
                                    <span>Создать / Загрузить договор</span>
                                </button>
                                <button className="notifications-btn header-item" onClick={handleNotificationsClick}>
                                    <NotificationsNoneOutlinedIcon/>
                                </button>
                                <Link to={"profile"} className="user-wrapper header-item">
                                    <div className="user-image" style={{ backgroundImage: `url(https://192.168.7.74/files/images/${((user.image && user.image.path) ?? 'default.webp')})` }}></div>
                                    <span>{user.name} {user.surname}</span>
                                </Link>
                                <button className="logout-btn header-item"
                                        onClick={() => dispatch(logout())}>
                                    <LogoutOutlinedIcon/>
                                </button>
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
}
