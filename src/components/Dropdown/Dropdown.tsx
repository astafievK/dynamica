import { FC, useState, ChangeEvent } from "react";

interface DropdownProps {
    options: string[];
    label: string;
    onSelect: (value: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({ options, label, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

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

    return (
        <div className={`custom-dropdown ${isOpen ? 'expanded' : ''}`}>
            <input
                type="text"
                className="custom-dropdown__search"
                placeholder={label}
                value={searchValue}
                onChange={handleSearchChange}
                onClick={() => setIsOpen(true)}
            />
            {isOpen && (
                <ul className="custom-dropdown__menu">
                    {filteredOptions.map((option) => (
                        <li key={option} className="custom-dropdown__item" onClick={() => handleSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
