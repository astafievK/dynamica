import { FC, useState } from "react";
import { motion } from "framer-motion";
import {ExpandedLeftMenu} from "./ExpandedLeftMenu.tsx";
import { CollapsedLeftMenu } from "./CollapsedLeftMenu.tsx";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export const LeftMenu: FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.aside
            className={`left-menu ${isExpanded ? 'expanded' : 'collapsed'}`}
            animate={{
                width: isExpanded ? 230 : 61,
            }}
            initial={false}
            transition={{ duration: 0.15, ease: "easeInOut" }}
        >
            {isExpanded ? <ExpandedLeftMenu isExpanded={isExpanded} /> : <CollapsedLeftMenu />}

            <button className="toggle-btn left-menu-item" onClick={() => setIsExpanded(p => !p)}>
                <MenuOutlinedIcon/>
            </button>
        </motion.aside>
    );
};
