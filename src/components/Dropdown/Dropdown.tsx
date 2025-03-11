import { FC, useState, useEffect } from "react";
import "./Dropdown.css";
import {Cross} from "../Cross/Cross.tsx";

interface DropdownProps {
    options: string[];
    label: string;
    onSelect: (value: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({ options, label, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: string) => {
        setSelectedValue(option);
        onSelect(option);
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 400);
    };


    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
            }, 400);
        }
    }, [isClosing]);

    return (
        <>
            <div className="custom-dropdown">
                <button className="custom-dropdown__button" onClick={toggleDropdown}>
                    {selectedValue || label}
                    <img className="arrow" src="/arrow.svg" alt=""/>
                </button>
            </div>
            {
                isOpen && (
                    <div className={`modal modal-dropdown ${isClosing ? "hidden" : ""}`}>
                        <div className={`modal-content modal-notifications ${isClosing ? "hidden" : ""}`}>
                            <div className="modal-content__header">
                                <span className={"modal-title"}>{label}</span>
                                <Cross onClick={() => setIsClosing(true)} color={"#000000"} />
                            </div>
                            <div className="modal-content__body">
                                <ul className="items">
                                    {options.map((option) => (
                                        <li className="item" key={option}>
                                            <button className="item-button" onClick={() => handleSelect(option)}>
                                                {option}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={`spoiler ${isClosing ? "hidden" : ""}`}
                             onClick={() => setIsClosing(true)}></div>
                    </div>
                )
            }
        </>
    );
};
