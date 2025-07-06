import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../../../constants/navItems.tsx";
import { AnimatePresence, motion } from "framer-motion";
import "./ExpandedLeftMenu.css";
import { pageAnimation } from "../../../constants/motionSettings.ts";
import { useHasPermission } from "../../../store/hooks/useHasPermission.ts";
import { Permissions } from "../../../constants/permissions.ts";
import { ROUTES } from "../../../constants/routes.ts";

interface ExpandedLeftMenuProps {
    isExpanded: boolean;
}

export const ExpandedLeftMenu: FC<ExpandedLeftMenuProps> = ({ isExpanded }) => {


    return (
        <>

        </>
    );
};
