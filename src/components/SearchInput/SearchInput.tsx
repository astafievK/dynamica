import { FC, ChangeEvent, useRef, useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import './SearchInput.css';
import classNames from 'classnames';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    id: string;
}

export const SearchInput: FC<SearchInputProps> = ({
                                                      value,
                                                      onChange,
                                                      placeholder = 'Поиск...',
                                                      className = '',
                                                      id
                                                  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleClear = () => {
        onChange('');
    };

    return (
        <div className={`search-input ${className}`}>
            <div className="search-input__main">
                <SearchRoundedIcon className="search-input__icon search-input__icon--start" />
                <input
                    type="search"
                    className="search-input__field"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    autoComplete="off"
                    id={id}
                    ref={inputRef}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
            <div
                className={classNames('search-input__clear', {
                    visible: (isFocused && value.trim().length > 0)
                })}
            >
                <button className="search-input__clear--button">
                    <ClearRoundedIcon
                        className="search-input__icon search-input__icon--end"
                        onClick={handleClear}
                    />
                </button>
            </div>
        </div>
    );
};
