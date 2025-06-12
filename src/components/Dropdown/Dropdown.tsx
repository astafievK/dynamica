import { FC, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import "./Dropdown.css";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
    options: { id: number, title: string }[];
    label: string;
    searchPlaceholder?: string;
    value: { id: number, title: string } | null;
    onSelect: (value: { id: number, title: string }) => void;
    isDisabled?: boolean;
    externalClasses?: string[];
    searchEnabled?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
                                                options,
                                                label,
                                                searchPlaceholder = 'Поиск по названию',
                                                value,
                                                onSelect,
                                                isDisabled,
                                                externalClasses = [],
                                                searchEnabled = true
                                            }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        if (!isDisabled) {
            setIsOpen(prev => !prev);
        }
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

    const handleSelect = (option: {id: number, title: string}) => {
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isOpen) {
            setSearchValue("");
        }
    }, [isOpen]);

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
                style={value ? { color: 'var(--font-color)' } : undefined}
            >
                {value ? value.title : label}
                {!isDisabled && <img className="arrow" src="/arrow.svg" alt="arrow"/>}
            </button>

            <AnimatePresence>
                {isOpen && !isDisabled && (
                    <motion.div
                        className="custom-dropdown__menu"
                        role="menu"
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 10}}
                        transition={{duration: 0.1}}
                    >
                        {
                            searchEnabled && <input type="text" name={"dropdownTitle"} className="custom-dropdown__search"
                                                    placeholder={searchPlaceholder} value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}></input>
                        }
                        <ul className="custom-dropdown__list">
                            {
                                options
                                    .filter(option => option.title.toLowerCase().includes(searchValue.toLowerCase()))
                                    .map((option) => (
                                        <li
                                            key={option.id}
                                            className={classNames(
                                                "custom-dropdown__item",
                                                {selected: value?.id === option.id},
                                            )}
                                            role="option"
                                            aria-selected={value?.id === option.id}
                                        >
                                            <button
                                                className="custom-dropdown__item-button"
                                                type="button"
                                                onClick={() => handleSelect(option)}
                                            >
                                                {option.title}
                                            </button>
                                        </li>
                                    ))
                            }
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
