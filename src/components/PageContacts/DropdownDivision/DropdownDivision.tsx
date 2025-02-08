import { FC } from "react";


export const DropdownDivision: FC = () => {
    return (
        <div className="custom-dropdown">
            <button className="custom-dropdown__toggle" type="button">
                Подразделение
                <span className="arrow"></span>
            </button>
            <ul className="custom-dropdown__menu">
                <li className="custom-dropdown__item">Опция 1</li>
                <li className="custom-dropdown__item">Опция 2</li>
                <li className="custom-dropdown__item">Опция 3</li>
            </ul>
        </div>
    );
};
