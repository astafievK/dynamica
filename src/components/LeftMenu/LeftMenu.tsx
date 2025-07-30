import React, {FC} from "react";
import "./LeftMenu.css";
import {useHasPermission} from "../../store/hooks/useHasPermission.ts";
import {Permissions} from "../../constants/permissions.ts";
import {navItems} from "../../constants/navItems.tsx";
import {ROUTES} from "../../constants/routes.ts";
import { LeftMenuDropdownItem } from "./LeftMenuDropdown/LeftMenuDropdownItem/LeftMenuDropdownItem.tsx";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux.ts";
import {useDocumentDraftActions} from "../../store/hooks/useDocumentDraftActions.ts";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from "react-router-dom";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import {logout} from "../../api/slices/authSlice.ts";
import {setIsOpen as setLoginModalOpen} from "../../api/slices/modalLoginSlice.ts";
import {LeftMenuDropdown} from "./LeftMenuDropdown/LeftMenuDropdown.tsx";
import DataUsageRoundedIcon from '@mui/icons-material/DataUsageRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import { motion } from "framer-motion";
import {pageAnimation} from "../../constants/pageAnimation.ts";

export const LeftMenu: FC = () => {
    const dispatch = useAppDispatch();
    const {user} = useTypedSelector((state) => state.auth);
    const {createDocument, isCreating} = useDocumentDraftActions();
    const navigate = useNavigate();

    const handleCreateDocumentClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isCreating) return;

        await createDocument();
        navigate(ROUTES.DOCUMENTS_DRAFTS);
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

    const canViewMetrics = useHasPermission(
        [Permissions.Developer],
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
        [
            Permissions.ApproverLegal,
            Permissions.ApproverCentralMarketing,
            Permissions.ApproverSecurityService,
            Permissions.ApproverAccounting,
            Permissions.Superuser,
            Permissions.Developer
        ],
        "any"
    );

    return (
        <motion.aside
            {...pageAnimation}
            className={`left-menu`}>
            <div className="logo-wrapper">
                <img className="logo" src="/logo-horizontal-black.svg" alt={"динамика"}></img>
            </div>

            <nav className="general-navigation left-menu-navigation">
                <div className="left-menu-navigation__items">
                    {navItems.map(({title, path, icon}) => {
                        return (
                            <LeftMenuDropdownItem
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
                <LeftMenuDropdown
                    label="Управление"
                    classNames={["admin-navigation"]}
                    icon={<EditRoundedIcon/>}
                    items={[
                        canViewContacts && (
                            <LeftMenuDropdownItem
                                key="departments"
                                label="Отделы"
                                linkTo={ROUTES.ADMIN_CONTACTS}
                            />
                        ),
                        canViewFeed && (
                            <LeftMenuDropdownItem
                                key="news"
                                label="Новости"
                                linkTo={ROUTES.ADMIN_FEED}
                            />
                        ),
                    ]}
                />
            )}

            {canViewDocuments && (
                <LeftMenuDropdown
                    label="ЭДО"
                    classNames={["documents-navigation"]}
                    icon={<DescriptionRoundedIcon/>}
                    items={[
                        <LeftMenuDropdownItem
                            label="Все документы"
                            linkTo={ROUTES.DOCUMENTS}
                            action={{
                                icon: <AddRoundedIcon/>,
                                title: "Создать черновик документа",
                                onClick: (e) => handleCreateDocumentClick(e)
                            }}
                        />,
                        <LeftMenuDropdownItem
                            label="Черновики"
                            linkTo={ROUTES.DOCUMENTS_DRAFTS}
                        />,
                        <LeftMenuDropdownItem
                            label="Тест | Пар. документ"
                            linkTo={ROUTES.DOCUMENT_PARALLEL}
                        />,
                        <LeftMenuDropdownItem
                            label="Тест | Посл. документ"
                            linkTo={ROUTES.DOCUMENT}
                        />
                    ]}
                />
            )}

            {canViewMetrics && (
                <LeftMenuDropdown
                    label="Метрики"
                    classNames={["metrics-navigation"]}
                    icon={<DataUsageRoundedIcon/>}
                    items={[

                    ]}
                />
            )}

            <div className="profile-container">
                {
                    user && (
                        <>
                            <LeftMenuDropdownItem
                                label={"Профиль"}
                                linkTo={"/profile"}
                                icon={<Person2RoundedIcon/>}
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
        </motion.aside>
    );
}
