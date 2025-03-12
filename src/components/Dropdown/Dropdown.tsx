import { FC, useState, useEffect } from "react";
import "./Dropdown.css";

interface DropdownProps {
    options: {id: number, title: string}[];
    label: string;
    onSelect: (value: {id: number | null, title: string | null}) => void;
}

export const Dropdown: FC<DropdownProps> = ({ options, label, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedValue, setSelectedValue] = useState<{id: number | null, title: string | null}>({id: null, title: null});

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: {id: number, title: string}) => {
        setSelectedValue(option);
        onSelect(option);
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 400);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

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
            <div className={`custom-dropdown ${isOpen && 'active'}`}>
                <button className="custom-dropdown__button" onClick={toggleDropdown}>
                    {selectedValue.title || label}
                    <img className="arrow" src="/arrow.svg" alt=""/>
                </button>
            </div>
            {
                isOpen && (
                    <div className={`modal ${isClosing ? "hidden" : ""}`} id="modalDropdown">
                        <div className={`modal-content modal-dropdown ${isClosing ? "hidden" : ""}`}>
                            <div className="modal-content__header">
                                <span className={"modal-title"}>{label}</span>
                            </div>
                            <div className="modal-content__body">
                                <ul className="items">
                                    {options.map((option) => (
                                        <li className="item" key={option.id}>
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
