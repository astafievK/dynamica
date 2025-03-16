import { FC, useState } from "react";
import { useGetDepartmentsNotNullQuery } from "../../../api/methods/departmentApi.ts";

export const FilterDepartments: FC = () => {
    const { data: departmentsData } = useGetDepartmentsNotNullQuery();

    const [activeFilter, setActiveFilter] = useState<string | null>("''");

    return (
        <div className="filters-departments">
            <button
                className={`filters-departments__item ${activeFilter === '' ? "selected" : ""}`}
                key={0}
                onClick={() => setActiveFilter("''")}
            >
                Все
            </button>
            {departmentsData?.departments.map((department) => (
                <button
                    className={`filters-departments__item ${activeFilter === department.title ? "selected" : ""}`}
                    key={department.id_department}
                    onClick={() => setActiveFilter(department.title)}
                >
                    {department.title}
                </button>
            ))}
        </div>
    );
};
