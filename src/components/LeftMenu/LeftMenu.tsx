import { FC } from "react";
import { motion } from "framer-motion";
import {ExpandedLeftMenu} from "./ExpandedLeftMenu/ExpandedLeftMenu.tsx";
import { CollapsedLeftMenu } from "./CollapsedLeftMenu/CollapsedLeftMenu.tsx";
import {useTypedSelector} from "../../store/hooks/redux.ts";
import "./LeftMenu.css";

export const LeftMenu: FC = () => {
    const { leftMenuIsExpanded } = useTypedSelector((state) => state.leftMenuReducer)

    return (
        <motion.aside
            className={`left-menu ${leftMenuIsExpanded ? 'expanded' : 'collapsed'}`}
            animate={{
                width: leftMenuIsExpanded ? 210 : 56,
            }}
            initial={false}
            transition={{ duration: 0.15, ease: "easeInOut" }}
        >
            {leftMenuIsExpanded ? <ExpandedLeftMenu isExpanded={leftMenuIsExpanded} /> : <CollapsedLeftMenu />}
        </motion.aside>
    );
};
