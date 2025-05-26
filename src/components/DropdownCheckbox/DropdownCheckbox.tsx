import React, { useState } from 'react';
import './DropdownCheckbox.css';
import {AnimatePresence, motion } from 'framer-motion';

type Option = {
    label: string;
    value: string;
};

type DropdownCheckboxProps = {
    options: Option[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    visibleAtStart?: boolean;
};

export const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
                                                                    options,
                                                                    selectedValues,
                                                                    onChange,
                                                                    placeholder = 'Выберите...',
                                                                    visibleAtStart = false,
                                                                  }) => {
    const [isOpen, setIsOpen] = useState(visibleAtStart);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleCheckboxChange = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    return (
        <div className={`checkbox-dropdown` + (isOpen ? " expanded" : "")}>
            <button
                type="button"
                className="checkbox-dropdown__toggle"
                onClick={toggleDropdown}
            >
                {selectedValues.length > 0
                    ? `${placeholder} (${selectedValues.length})`
                    : placeholder}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="checkbox-dropdown__menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1}}
                        exit={{ height: 0, opacity: 0}}
                        transition={{ duration: 0.15 }}
                    >
                        <div className="checkbox-dropdown__menu-inner">
                            {options.map((option) => (
                                <label
                                    key={option.value}
                                    className={`checkbox-dropdown__option${
                                        selectedValues.includes(option.value)
                                            ? ' checkbox-dropdown__option--selected'
                                            : ''
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedValues.includes(option.value)}
                                        onChange={() => handleCheckboxChange(option.value)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
