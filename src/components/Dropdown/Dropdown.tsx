import { AnimatePresence, motion } from "framer-motion";
import { FC, useState, ChangeEvent, useRef, useEffect } from "react";
import "./Dropdown.css";
import { Cross } from "../Cross/Cross.tsx";

interface DropdownProps {
    options: string[];
    label: string;
    onSelect: (value: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({ options, label, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        setFilteredOptions(options.filter(option => option.toLowerCase().includes(value.toLowerCase())));
        setIsOpen(true);
    };

    const handleSelect = (option: string) => {
        setSearchValue(option);
        setIsOpen(false);
        onSelect(option);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsOpen(false);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`custom-dropdown ${isOpen ? 'expanded' : ''}`}>
            <input
                type="text"
                className="custom-dropdown__search"
                placeholder={label}
                value={searchValue}
                onChange={handleSearchChange}
                onClick={() => setIsOpen(true)}
            />

            {searchValue.length >= 1 && (
                <Cross onClick={() => setSearchValue("")} color={"#000000"} />
            )}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, translateY: -5 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="custom-dropdown__menu"
                    >
                        {filteredOptions.map((option) => (
                            <li key={option} className="custom-dropdown__item" onClick={() => handleSelect(option)}>
                                {option}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};
