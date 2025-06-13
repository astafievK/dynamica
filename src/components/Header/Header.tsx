import {FC, useEffect, useRef, useState} from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { setModalNotificationsIsOpen as setNotificationsModalOpen } from "../../api/slices/modalNotificationsSlice.ts";
import { setIsOpen as setMobileMenuOpen } from "../../api/slices/mobileMenuSlice.ts";
import {Link, NavLink} from "react-router-dom";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import {logout} from "../../api/slices/authSlice.ts";
import {useCreateDocument} from "../Contexts/CreateDocumentContext/CreateDocumentContext.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {useHasPermission} from "../../store/hooks/useHasPermission.ts";
import {Permissions} from "../../constants/permissions.ts";

export const Header: FC = () => {
    const {user} = useTypedSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const {openModal} = useCreateDocument();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    const isDeveloper = useHasPermission(Permissions.Developer);
    const isAbleToUseAdminPanel = useHasPermission([Permissions.Superuser, Permissions.UpdateUsers], 'any')

    // Явно закрываем меню пользователя
    useEffect(() => {
        if (!user) {
            setMenuOpen(false);
        }
    }, [user]);

    // Закрытие по клику вне
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMenu();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <div className={`header-wrapper`}>
            <header>
                <NavLink to="/" id="logo">
                    <img src="/logo.svg" alt="динамика"/>
                </NavLink>
                {
                    /*
                    <div className="global-search-container">
                        <input type="text" className="global-search styled" placeholder="Поиск по всему порталу" disabled/>
                    </div>
                     */
                }

                <div className="profile-container">
                    {!user && (
                        <button className="login-btn header-item rounded" onClick={() => dispatch(setLoginModalOpen(true))}>
                            <LoginRoundedIcon fontSize="large"/>
                        </button>
                    )}

                    {user && (
                        <>
                            {
                                isAbleToUseAdminPanel && (
                                    <Link to="admin/contacts" className="admin-panel-btn header-item rounded">
                                        <AdminPanelSettingsOutlinedIcon/>
                                    </Link>
                                )
                            }
                            {
                                isDeveloper && (
                                    <button className="create-doc header-item rounded" onClick={openModal}>
                                        <NoteAddOutlinedIcon/>
                                    </button>
                                )
                            }
                            {
                                isDeveloper && (
                                    <button className="notifications-btn header-item rounded" onClick={() => dispatch(setNotificationsModalOpen(true))}>
                                        <NotificationsNoneOutlinedIcon/>
                                    </button>
                                )
                            }

                            <div className="user-dropdown-wrapper header-item rounded" ref={menuRef}
                                 onClick={toggleMenu}>
                                <button className="user-wrapper">
                                    <div
                                        className="user-image"
                                        style={{
                                            backgroundImage: `url(${import.meta.env.VITE_BASE_IMAGE_URL}${user.image?.path ?? 'default.webp'})`
                                        }}
                                    ></div>
                                </button>

                                <AnimatePresence>
                                    {menuOpen && (
                                        <motion.div
                                            initial={{opacity: 0, top: "calc(100% + 25px)"}}
                                            animate={{opacity: 1, top: "calc(100% + 8px)"}}
                                            exit={{opacity: 0, top: "calc(100% + 25px)"}}
                                            transition={{duration: 0.1}}
                                            className="user-dropdown-menu"
                                        >
                                            <Link className="user-dropdown-menu__item" to={"/profile"}>Профиль</Link>
                                            <button className="user-dropdown-menu__item" onClick={() => {
                                                closeMenu();
                                                dispatch(logout());
                                            }}>
                                                Выйти
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>

                <div className="burger" id={"burger"} onClick={() => dispatch(setMobileMenuOpen(true))}>
                    <div className="body">
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                    </div>
                </div>
            </header>
        </div>
    );
}
