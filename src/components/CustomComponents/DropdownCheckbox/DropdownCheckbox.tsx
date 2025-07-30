import React, { useState } from 'react';
import './DropdownCheckbox.css';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

type Option = {
    id: number;
    title: string;
    system_name?: string;
};

type DropdownCheckboxProps = {
    options: Option[];
    selectedValues: number[];
    onChange: (id: number) => void;
    placeholder?: string;
    visibleAtStart?: boolean;
    areVariantsDisabled?: boolean;
    loadingId?: number | null;
};

export const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
    options,
    selectedValues,
    onChange,
    placeholder = 'Выберите...',
    visibleAtStart = false,
    areVariantsDisabled = false,
    loadingId,
                                                                  }) => {
    const [isOpen, setIsOpen] = useState(visibleAtStart);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    return (
        <div className={classNames('checkbox-dropdown', { 'expanded': isOpen })}>
            <button
                type="button"
                className="checkbox-dropdown__toggle"
                onClick={toggleDropdown}
            >
                {Array.isArray(selectedValues) && selectedValues.length > 0
                    ? `${placeholder} (${selectedValues.length})`
                    : placeholder}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="checkbox-dropdown__menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <div className="checkbox-dropdown__menu-inner">
                            {options.map((option) => (
                                <label
                                    key={option.id}
                                    className={classNames(
                                        'checkbox-dropdown__option',
                                        { 'checkbox-dropdown__option--selected': selectedValues.includes(option.id) },
                                        { 'is-disabled': areVariantsDisabled },
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedValues.includes(option.id)}
                                        onChange={() => onChange(option.id)}
                                        disabled={areVariantsDisabled}
                                    />
                                    {option.title}
                                    <AnimatePresence>
                                        {
                                            loadingId === option.id &&
                                            <motion.div
                                                className="shimmer"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                            />
                                        }
                                    </AnimatePresence>

                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
