import { FC } from "react";
import { motion } from "framer-motion";
import { Employee } from "../../../interfaces/IEmployee.ts";
import {useTypedSelector} from "../../../store/hooks/redux.ts";
import { DetailsItem } from "./DetailsItem/DetailsItem.tsx";
import { formatBirthday } from "../../../utils/date.ts";

interface Props {
    employee: Employee;
}

export const EmployeeDetails: FC<Props> = ({ employee }) => {
    const { user } = useTypedSelector(state => state.auth);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="employee-card__details"
        >
            {(user || employee.email) && (
                <DetailsItem
                    title="Почта"
                    value={employee.email ?? ''}
                    isReadOnly={!user}
                    employee={employee}
                />
            )}
            {employee.phone && (
                <DetailsItem title="Телефон" value={employee.phone} employee={employee} />
            )}
            {employee.department.title && (
                <DetailsItem title="Подразделение" value={employee.department.title} employee={employee} />
            )}
            {employee.department.city && (
                <DetailsItem title="Город" value={employee.department.city.title} employee={employee} />
            )}
            {employee.birthday?.date && (
                <DetailsItem
                    title="День рождения"
                    value={formatBirthday(employee.birthday.date)}
                    employee={employee}
                />
            )}
        </motion.div>
    );
};
