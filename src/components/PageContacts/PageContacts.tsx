import { FC } from "react";
import {pageAnimation} from "../../motionSettins.ts";
import {motion} from "framer-motion";
import {DropdownCity} from "./DropdownCity/DropdownCity.tsx";
import {DropdownOrganization} from "./DropdownOrganizaion/DropdownOrganization.tsx";
import {DropdownDivision} from "./DropdownDivision/DropdownDivision.tsx";
import {EmployeeCard} from "./EmployeeCard/EmployeeCard.tsx";

export const PageContacts: FC = () => {
    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className="page page-contacts">
            <div className="filters-container">
                <div className="filters-select">
                    <DropdownCity/>
                    <DropdownOrganization/>
                    <DropdownDivision/>
                </div>
                <div className="filters-search">
                    <input type="text" className="filters-search__text" placeholder="ФИО"/>
                    <button type="submit" className="filters-search__submit">Применить</button>
                </div>
            </div>
            <div className="employees-container">
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
                <EmployeeCard
                    name={"Гледенов Максим Александрович"}
                    position={"Руководитель группы BI-аналитики"}
                    division={"Администрация Архангельск"}
                    city={"Архангельск"}
                    email={"maks.gledenov@hahaha.ru"}
                    phone={"+79210106565"}/>
            </div>
        </motion.div>
    );
};
