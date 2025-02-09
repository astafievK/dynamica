import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageAnimation } from "../../motionSettins.ts";
import { EmployeeCard } from "./EmployeeCard/EmployeeCard.tsx";
import { Dropdown } from "../Dropdown/Dropdown.tsx";

interface FilterOption {
    label: string;
    options: string[];
    onSelect: (value: string) => void;
}

const employeeList = [
    {
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },
];

export const PageContacts: FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedOrganization, setSelectedOrganization] = useState<string>("");
    const [selectedDivision, setSelectedDivision] = useState<string>("");

    useEffect(() => {
        document.title = "Адресная книга";
    }, []);

    const filterOptions: FilterOption[] = [
        { label: "Город", options: ["Архангельск", "Москва", "Санкт-Петербург"], onSelect: setSelectedCity },
        { label: "Организация", options: ["Организация 1", "Организация 2"], onSelect: setSelectedOrganization },
        { label: "Подразделение", options: ["Подразделение 1", "Подразделение 2"], onSelect: setSelectedDivision },
    ];

    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className="page page-contacts"
        >
            <div className="filters-container">
                <div className="filters-select">
                    {filterOptions.map((filter) => (
                        <Dropdown key={filter.label} label={filter.label} options={filter.options} onSelect={filter.onSelect} />
                    ))}
                </div>
                <div className="filters-search">
                    <input type="text" className="filters-search__text" placeholder="ФИО" />
                    <button type="submit" className="filters-search__submit">Применить</button>
                </div>
            </div>
            <div className="employees-container">
                {employeeList.map((employee, index) => (
                    <EmployeeCard
                        key={index}
                        name={employee.name}
                        position={employee.position}
                        division={employee.division}
                        city={employee.city}
                        email={employee.email}
                        phone={employee.phone}
                    />
                ))}
            </div>
        </motion.div>
    );
};
