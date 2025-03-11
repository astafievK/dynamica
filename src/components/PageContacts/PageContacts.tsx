import { motion } from "framer-motion";
import {useGetUsersNotRetiredQuery} from "../../api/methods/userApi.ts";
import {FC, useEffect} from "react";
import {pageAnimation} from "../../motionSettins.ts";
import {EmployeeCard} from "./EmployeeCard/EmployeeCard.tsx";

export const PageContacts: FC = () => {
    const { data } = useGetUsersNotRetiredQuery();

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
                <div className="filters-search">
                    <input type="text" className="filters-search__text" placeholder="ФИО"/>
                    <button type="submit" className="filters-search__submit">Применить</button>
                </div>
            </div>
            <div className="employees-container">
                {data?.users ? (
                    data.users.map((employee, index) => (
                        <EmployeeCard
                            key={index}
                            name={`${employee.surname} ${employee.name} ${employee.patronymic}`}
                            position={employee.position?.title || "Не указана"}
                            division={" "}
                            city={" "}
                            email={employee.email}
                            phone={employee.phone}
                        />
                    ))
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </motion.div>
    );
};
