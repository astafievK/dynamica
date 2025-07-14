import React from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import classNames from "classnames";

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
        <div
            className={classNames("tabs-item", {
                active: isActive,
                removing: isRemoving,
            })}
            onClick={onClick}
            title={title}
        >
            <span className="tab-title">{title}</span>
            {tabsCount > 1 && (
                <button
                    type="button"
                    className="tab-close"
                    title="Удалить документ"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    <CloseRoundedIcon />
                </button>
            )}
        </div>
    );
};
