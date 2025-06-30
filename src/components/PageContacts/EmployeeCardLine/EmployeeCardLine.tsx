import React, { FC } from "react";
import { motion } from "framer-motion";
import { IUser } from "../../../interfaces/IUser.ts";
import {monthsGenitive} from "../../../constants/months.ts";

interface IEmployeeCardLineProps {
    employee: IUser;
}

export const EmployeeCardLine: FC<IEmployeeCardLineProps> = React.memo(({ employee }) => {
    const getFormattedBirthday = (): string => {
        if (!employee.birthday?.date) return "";
        const birthDate = new Date(employee.birthday.date);
        const birthMonth = birthDate.getMonth() + 1;
        const day = birthDate.getDate();
        const monthName = monthsGenitive[birthMonth] || "";
        return `${day} ${monthName.toLowerCase()}`;
    };

    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4}}
                className={`employee-card`}
            >
                <div className="employee-card-item employee-card__photo" style={{backgroundImage: `url(https://newportal/files/images/${employee.image.path})`}}></div>
                <div className="employee-card-item employee-card__surname">
                    <span className="employee-card-item__content">{employee.surname}</span>
                </div>
                <div className="employee-card-item employee-card__name">
                    <span className="employee-card-item__content">{employee.name}</span>
                </div>
                <div className="employee-card-item employee-card__patronymic">
                    <span className="employee-card-item__content">{employee.patronymic}</span>
                </div>
                <div className="employee-card-item employee-card__position">
                    <span className="employee-card-item__content">{employee.position.title}</span>
                </div>
                <div className="employee-card-item employee-card__email">
                    <span className="employee-card-item__content">{employee.email}</span>
                </div>
                <div className="employee-card-item employee-card__phone">
                    <span className="employee-card-item__content">{employee.phone}</span>
                </div>
                <div className="employee-card-item employee-card__birthday">
                    <span className="employee-card-item__content">
                        {employee.birthday?.date ? getFormattedBirthday() : "-"}
                    </span>
                </div>
            </motion.div>
        </>
    );
})