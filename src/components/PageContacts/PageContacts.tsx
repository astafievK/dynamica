import { FC, useEffect } from "react";
import { motion} from "framer-motion";
import { pageAnimation } from "../../motionSettins.ts";
import { EmployeeCard } from "./EmployeeCard/EmployeeCard.tsx";
import {FilterDepartments} from "./FilterDepartments/FilterDepartments.tsx";

const employeeList = [
    {
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },
    {
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },{
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },{
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },{
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },{
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },{
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },{
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },{
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },{
        name: "Гледенов Максим Александрович",
        position: "Руководитель группы BI-аналитики",
        division: "Администрация Архангельск",
        city: "Архангельск",
        email: "maks.gledenov@hahaha.ru",
        phone: "+79210106565",
    },
];

export const PageContacts: FC = () => {
    useEffect(() => {
        document.title = "Адресная книга";
    }, []);

    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className="page page-contacts"
        >
            <div className="page-header">
                <span className="page-title page-title__name">Адресная книга</span>
            </div>
            <div className="filters-container">
                <FilterDepartments/>
                <div className="filters-search">
                    <input type="text" className="filters-search__text" placeholder="ФИО"/>
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
}
