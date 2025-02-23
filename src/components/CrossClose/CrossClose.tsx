import React from "react";

interface ICrossCloseProps {
    onClick: () => void;
    color: string;
}

export const CrossClose: React.FC<ICrossCloseProps> = ({ onClick, color }) => {
    return (
        <button className="cross" onClick={onClick}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M19 5L5 19M5.00001 5L19 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
        </button>
    );
};
