import { FC } from "react";

export const EmployeesHeader: FC = () => {
    return (
        <>
            <div className="employees-header">
                <div className="employees-header-item">
                    <span>Фотография</span>
                </div>
                <div className="employees-header-item">
                    <span>Фамилия</span>
                </div>
                <div className="employees-header-item">
                    <span>Имя</span>
                </div>
                <div className="employees-header-item">
                    <span>Отчество</span>
                </div>
                <div className="employees-header-item">
                    <span>Должность</span>
                </div>
                <div className="employees-header-item">
                    <span>Почта</span>
                </div>
                <div className="employees-header-item">
                    <span>Телефон</span>
                </div>
                <div className="employees-header-item">
                    <span>День рождения</span>
                </div>
            </div>
        </>
    );
}