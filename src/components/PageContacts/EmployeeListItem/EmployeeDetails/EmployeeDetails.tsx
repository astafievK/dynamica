import { FC } from "react";
import { Employee } from "../../../../interfaces/IEmployee.ts";
import {useTypedSelector} from "../../../../store/hooks/redux.ts";
import { DetailsItem } from "../DetailsItem/DetailsItem.tsx";
import { formatBirthday } from "../../../../utils/date.ts";
import { formatPhone } from "../../../../utils/formatPhone.ts";
import {useHasPermission} from "../../../../store/hooks/useHasPermission.ts";
import { Permissions } from "../../../../constants/permissions.ts";
import "./EmployeeDetails.css"

interface Props {
    employee: Employee;
}

export const EmployeeDetails: FC<Props> = ({ employee }) => {
    const { user } = useTypedSelector(state => state.auth);
    const canViewEmail = useHasPermission(Permissions.Superuser)

    return (
        <div className="employee-card__details">
            {(canViewEmail || employee.email) && (
                <DetailsItem
                    title="Почта"
                    value={employee.email ?? ''}
                    isReadOnly={!user}
                    employee={employee}
                />
            )}
            {employee.phone && (
                <DetailsItem title="Телефон" value={formatPhone(employee.phone)} employee={employee} />
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
        </div>
    );
};
