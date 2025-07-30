import React from "react";
import "./CustomCheckbox.css";

interface CustomCheckboxProps {
    checked: boolean;
    onChange: () => void;
    label?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, label }) => {
    return (
        <label className="custom-checkbox">
            <input
                type="checkbox"
                className="custom-checkbox__input"
                checked={checked}
                onChange={onChange}
            />
            <span className="custom-checkbox__box">
                <svg className="custom-checkbox__checkmark" viewBox="0 0 24 24">
                    <polyline points="4 12 10 18 20 6" />
                </svg>
            </span>
            {label && <span className="custom-checkbox__label">{label}</span>}
        </label>
    );
};
