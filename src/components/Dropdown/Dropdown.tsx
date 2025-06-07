import { FC, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import "./Dropdown.css";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
    options: { id: number, title: string }[];
    label: string;
    value: { id: number, title: string } | null;
    onSelect: (value: { id: number, title: string }) => void;
    isDisabled?: boolean;
    classNames?: string[];
}

export const Dropdown: FC<DropdownProps> = ({
                                                options,
                                                label,
                                                value,
                                                onSelect,
                                                isDisabled,
                                                classNames: externalClasses = []
                                            }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<{ id: number, title: string } | null>(value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        if (!isDisabled) {
            setIsOpen(prev => !prev);
        }
    };

    const handleSelect = (option: { id: number, title: string }) => {
        setSelectedValue(option);
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    return (
        <div
            className={classNames("custom-dropdown", externalClasses, {
                disabled: isDisabled
            })}
            ref={dropdownRef}
        >
            <button
                className={classNames("custom-dropdown__button", {
                    active: isOpen
                })}
                onClick={toggleDropdown}
                type="button"
                disabled={isDisabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {selectedValue ? selectedValue.title : label}
                {!isDisabled && <img className="arrow" src="/arrow.svg" alt="arrow" />}
            </button>

            <AnimatePresence>
                {isOpen && !isDisabled && (
                    <motion.ul
                        className="custom-dropdown__list"
                        role="listbox"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.1 }}
                    >
                        {options.map((option) => (
                            <li
                                key={option.id}
                                className={classNames(
                                    "custom-dropdown__item",
                                    { selected: selectedValue?.id === option.id},

                                )}
                                role="option"
                                aria-selected={selectedValue?.id === option.id}
                            >
                                <button
                                    className="custom-dropdown__item-button"
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.title}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};
