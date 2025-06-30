import React from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import classNames from "classnames";
import { pageAnimation } from "../../../../constants/motionSettings.ts";
import { motion } from "framer-motion";

interface ITabProps {
    id: number;
    title: string;
    isActive: boolean;
    onClick: () => void;
    onClose: () => void;
    tabsCount: number;
}

export const Tab: React.FC<ITabProps> = ({ title, isActive, onClick, onClose, tabsCount }) => {
    return (
        <motion.button
            {...pageAnimation}
            className={classNames("tab tabs-item", { active: isActive })}
            onClick={onClick}
            title={title}
        >
            <span className="tab-title">{title}</span>
            {tabsCount > 1 && (
                <button
                    type="button"
                    className="tab-close"
                    title={"Удалить документ"}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    <CloseRoundedIcon />
                </button>
            )}
        </motion.button>
    );
};
