import React from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import classNames from "classnames";
import {LoadingCircle} from "../../../LoadingCircle/LoadingCircle.tsx";

interface ITabProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
    onClose: () => void;
    tabsCount: number;
    isRemoving?: boolean;
}

export const Tab: React.FC<ITabProps> = ({ title, isActive, onClick, onClose, tabsCount, isRemoving }) => {
    return (
        <button
            className={classNames("tabs-item", {
                active: isActive,
                removing: isRemoving,
            })}
            onMouseDown={onClick}
            title={title}
            type={"button"}
        >
            <span className="tab-title">{title}</span>
            {tabsCount > 1 && (
                <button
                    type="button"
                    className="tab-close"
                    title="Удалить черновик"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    {
                        isRemoving ?
                            <LoadingCircle size={18} /> :
                            <CloseRoundedIcon />
                    }
                </button>
            )}
        </button>
    );
};
