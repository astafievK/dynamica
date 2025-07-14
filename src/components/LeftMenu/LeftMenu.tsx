import React, {FC} from "react";
import "./LeftMenu.css";
import {useHasPermission} from "../../store/hooks/useHasPermission.ts";
import {Permissions} from "../../constants/permissions.ts";
import {navItems} from "../../constants/navItems.tsx";
import {ROUTES} from "../../constants/routes.ts";
import { LeftMenuNavigationItem } from "./LeftMenuNavigationItem/LeftMenuNavigationItem.tsx";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux.ts";
import {useDocumentDraftActions} from "../../store/hooks/useDocumentDraftActions.ts";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from "react-router-dom";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import {logout} from "../../api/slices/authSlice.ts";
import {setIsOpen as setLoginModalOpen} from "../../api/slices/modalLoginSlice.ts";

export const LeftMenu: FC = () => {
    const dispatch = useAppDispatch();
    const {user} = useTypedSelector((state) => state.auth);
    const {createDocument, isCreating} = useDocumentDraftActions();
    const navigate = useNavigate();

    const handleCreateDocumentClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isCreating) return;

        await createDocument();
        navigate("/documents/create");
    };

    const isAdminMenuEnabled = useHasPermission(
        [
            Permissions.Developer,
            Permissions.UpdateUsers,
            Permissions.Superuser,
            Permissions.CreateUpdateNews,
        ],
        "any"
    );

    const canViewContacts = useHasPermission(
        [Permissions.UpdateUsers, Permissions.Superuser, Permissions.Developer],
        "any"
    );

    const canViewFeed = useHasPermission(
        [Permissions.CreateUpdateNews, Permissions.Superuser, Permissions.Developer],
        "any"
    );

    const canViewDocuments = useHasPermission(
        [Permissions.DocumentApprover, Permissions.Superuser, Permissions.Developer],
        "any"
    );

    return (
        <aside className={`left-menu`}>
            <div className="logo-wrapper">
                <img className="logo" src="/logo-horizontal-black.svg" alt={"динамика"}></img>
            </div>
            <nav className="general-navigation left-menu-navigation">
                <div className="left-menu-navigation__items">
                    {navItems.map(({title, path, icon}) => {
                        return (
                            <LeftMenuNavigationItem
                                key={path}
                                label={title}
                                linkTo={path}
                                icon={icon}
                            />
                        );
                    })}
                </div>
            </nav>

            {isAdminMenuEnabled && (
                <div className="admin-navigation left-menu-navigation">
                    <span className="left-menu-navigation__title">Администрирование</span>
                    <div className="left-menu-navigation__items">
                        {canViewContacts && (
                            <LeftMenuNavigationItem
                                label="Отделы"
                                linkTo={ROUTES.ADMIN_CONTACTS}
                            />
                        )}
                        {canViewFeed && (
                            <LeftMenuNavigationItem
                                label="Новости"
                                linkTo={ROUTES.ADMIN_FEED}
                            />
                        )}
                    </div>
                </div>
            )}

            {canViewDocuments && (
                <div className="documents-navigation left-menu-navigation">
                    <span className="left-menu-navigation__title">Документооборот</span>
                    <div className="left-menu-navigation__items">
                        <LeftMenuNavigationItem
                            label="Все документы"
                            linkTo={ROUTES.DOCUMENTS}
                            action={{
                                icon: <AddRoundedIcon/>,
                                title: "Создать черновик документа",
                                onClick: (e) => handleCreateDocumentClick(e)
                            }}
                        />
                        <LeftMenuNavigationItem
                            label="Тест | Пар. документ"
                            linkTo={ROUTES.DOCUMENT_PARALLEL}
                        />
                        <LeftMenuNavigationItem
                            label="Тест | Посл. документ"
                            linkTo={ROUTES.DOCUMENT}
                        />
                    </div>
                </div>
            )}

            <div className="profile-container left-menu-navigation">
                {
                    user && (
                        <>
                            <LeftMenuNavigationItem
                                label={"Профиль"}
                                linkTo={"/profile"}
                            />
                            <button className="logout-btn" onClick={() => {dispatch(logout());}}>
                                <LogoutRoundedIcon/>
                            </button>
                        </>

                    )
                }
                {
                    !user && (
                        <button className="left-menu-navigation__item" onClick={() => dispatch(setLoginModalOpen(true))}>
                            <span className="icon"><LoginRoundedIcon/></span>
                            <span className="label">Вход</span>
                        </button>
                    )
                }
            </div>
        </aside>
    );
}
