import { AnimatePresence, motion } from "framer-motion";
import { FC, useState, useRef, useEffect } from "react";
import "./Dropdown.css";

interface DropdownProps {
    options: string[];
    label: string;
    onSelect: (value: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({ options, label, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: string) => {
        setSelectedValue(option);
        setIsOpen(false);
        onSelect(option);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`custom-dropdown ${isOpen ? 'expanded' : ''}`}>
            <button className="custom-dropdown__button" onClick={toggleDropdown}>
                {selectedValue || label}
                <img className={"arrow"} src={"/arrow.svg"} alt={""}/>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, translateY: -5 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="custom-dropdown__menu"
                    >
                        {options.map((option) => (
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