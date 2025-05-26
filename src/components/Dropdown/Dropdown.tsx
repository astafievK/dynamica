import { FC, useState, useEffect } from "react";
import "./Dropdown.css";
import { Cross } from "../Cross/Cross.tsx";

interface DropdownProps {
    options: { id: number, title: string }[];
    label: string;
    value: { id: number, title: string } | null;
    onSelect?: (value: { id: number, title: string }) => void;
    isDisabled?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({ options, label, value, onSelect, isDisabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedValue, setSelectedValue] = useState<{ id: number, title: string } | null>(value);

    const toggleDropdown = () => {
        if (!isDisabled) {
            setIsOpen((prev) => !prev);
        }
    };

    const handleSelect = (option: { id: number, title: string }) => {
        setSelectedValue(option);
        if (onSelect) {
            onSelect(option);
        }
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 400);
    };

    useEffect(() => {
        if (!isDisabled) {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        return () => {
            if (!isDisabled) {
                document.body.style.overflow = '';
            }
        };
    }, [isOpen, isDisabled]);

    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
            }, 400);
        }
    }, [isClosing]);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    return (
        <>
            <div className={`custom-dropdown ${(isOpen && !isDisabled) ? 'active' : ''}`}>
                <button className="custom-dropdown__button" onClick={toggleDropdown}>
                    {label}
                    {!isDisabled && <img className="arrow" src="/arrow.svg" alt=""/>}
                </button>
            </div>
            {
                isOpen && !isDisabled && (
                    <div className={`modal ${isClosing ? "hidden" : ""}`} id="modalDropdown">
                        <div className={`modal-content modal-dropdown ${isClosing ? "hidden" : ""}`}>
                            <div className="modal-content__header">
                                <span className={"modal-title"}>{label}</span>
                                <Cross color={"#000000"} onClick={() => setIsClosing(true)} />
                            </div>
                            <div className="modal-content__body">
                                <ul className="items">
                                    {options.map((option) => (
                                        <li
                                            className={`item ${selectedValue?.id === option.id ? "selected" : ""}`}
                                            key={option.id}
                                        >
                                            <button className="item-button" onClick={() => handleSelect(option)}>
                                                {option.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={() => setIsClosing(true)}></div>
                    </div>
                )
            }
        </>
    );
}
