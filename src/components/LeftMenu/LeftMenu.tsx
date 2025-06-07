import { FC } from "react";
import { motion } from "framer-motion";
import {ExpandedLeftMenu} from "./ExpandedLeftMenu.tsx";
import { CollapsedLeftMenu } from "./CollapsedLeftMenu.tsx";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux.ts";
import {setLeftMenuIsExpanded} from "../../api/slices/leftMenuSlice.ts";

export const LeftMenu: FC = () => {
    const dispatch = useAppDispatch()
    const { leftMenuIsExpanded } = useTypedSelector((state) => state.leftMenuReducer)

    return (
        <motion.aside
            className={`left-menu ${leftMenuIsExpanded ? 'expanded' : 'collapsed'}`}
            animate={{
                width: leftMenuIsExpanded ? 230 : 61,
            }}
            initial={false}
            transition={{ duration: 0.15, ease: "easeInOut" }}
        >
            {leftMenuIsExpanded ? <ExpandedLeftMenu isExpanded={leftMenuIsExpanded} /> : <CollapsedLeftMenu />}

            <button className="toggle-btn left-menu-item" onClick={() => dispatch(setLeftMenuIsExpanded(!leftMenuIsExpanded))}>
                <MenuOutlinedIcon/>
            </button>
        </motion.aside>
    );
};
