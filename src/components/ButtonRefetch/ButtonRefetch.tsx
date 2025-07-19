import React from "react";
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import './ButtonRefetch.css';

interface IButtonRefetchProps {
    isFetching: boolean;
    onClick?: () => void;
}

export const ButtonRefetch: React.FC<IButtonRefetchProps> = ({ isFetching, onClick }) => {
    return (
        <button
            className={`refetch-button ${isFetching ? 'spinning' : ''}`}
            onClick={onClick}
            disabled={isFetching}
            title="Обновить данные"
        >
            <CachedRoundedIcon />
        </button>
    );
};