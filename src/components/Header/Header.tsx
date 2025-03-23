import {FC} from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { setModalNotificationsIsOpen as setNotificationsModalOpen } from "../../api/slices/modalNotificationsSlice.ts";
import { setIsOpen as setMobileMenuOpen } from "../../api/slices/mobileMenuSlice.ts";

import {Link, NavLink, useLocation} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";

const pageTitles: Record<string, string> = {
    "/": "Главная",
    "/feed": "Лента",
    "/editor": "Редактор",
    "/document": "Документ",
    "/document_par": "Документ (параллельный)",
    "/profile": "Профиль",
    "/documents": "Документы",
    "/contacts": "Адресная книга",
    "/admin": "Админ-панель",
    "/admin/feed": "Админ-панель • Лента",
    "/admin/contacts": "Админ-панель • Адресная книга",
    "/admin/documents": "Админ-панель • Документы",
    "/admin/adaptation": "Админ-панель • Адаптация",
    "/not_found": "Страница не найдена"
};

export const Header: FC = () => {
    const { user } = useTypedSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const currentTitle = pageTitles[location.pathname]

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
                        <button className="login header-item" onClick={() => dispatch(setLoginModalOpen(true))}>
                            Авторизация
                        </button>
                        {
                            user &&
                            <>
                                <Link to={"documents"} className={"create-doc header-item"}>
                                    Создать договор
                                </Link>
                                <button className="notifications-wrapper header-item" onClick={handleNotificationsClick}>
                                    <div className="notifications-image"></div>
                                </button>
                                <Link to={"profile"} className="user-wrapper header-item">
                                    <div className="user-image"></div>
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
