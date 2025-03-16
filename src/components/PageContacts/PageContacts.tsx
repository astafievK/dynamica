import { motion } from "framer-motion";
import { useGetUsersNotRetiredQuery } from "../../api/methods/userApi.ts";
import { FC, useEffect } from "react";
import { pageAnimation } from "../../motionSettins.ts";
import { EmployeeCard } from "./EmployeeCard/EmployeeCard.tsx";
import { FilterDepartments } from "./FilterDepartments/FilterDepartments.tsx";
import { formatDate } from "../../functions.ts";
import {ModalLoading} from "../Modals/ModalLoading/ModalLoading.tsx";

export const PageContacts: FC = () => {
    const { data, isLoading } = useGetUsersNotRetiredQuery();

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
                <FilterDepartments />
                <div className="filters-search">
                    <input type="text" className="filters-search__text styled" placeholder="ФИО"/>
                    <button type="submit" className="filters-search__submit">Применить</button>
                </div>
            </div>
            {isLoading ? (
                <ModalLoading />
            ) : data?.users && data.users.length === 0 ? (
                <p className={"no-data"}>Данные отсутствуют</p>
            ) : (
                <motion.div
                    initial={pageAnimation.initial}
                    animate={pageAnimation.animate}
                    exit={pageAnimation.exit}
                    transition={pageAnimation.transition}
                    className="employees-container">
                    {data?.users?.map((employee, index) => (
                        <EmployeeCard
                            key={index}
                            name={`${employee.surname} ${employee.name} ${employee.patronymic}`}
                            position={employee.position.title}
                            division={employee.department.division.title}
                            city={employee.department.city.title}
                            email={employee.email}
                            phone={employee.phone}
                            birthday={formatDate(employee.birthday.date)}
                            image={employee.image.path}
                        />
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};
