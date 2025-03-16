import { FC } from "react";
import { useGetDepartmentsNotNullQuery } from "../../../api/methods/departmentApi.ts";

interface FilterDepartmentsProps {
    filter: string | null;
    setFilter: (filter: string | null) => void;
}

export const FilterDepartments: FC<FilterDepartmentsProps> = ({ filter, setFilter }) => {
    const { data: departmentsData } = useGetDepartmentsNotNullQuery();

    return (
        <div className="filters-departments">
            <button
                className={`filters-departments__item ${filter === '' ? "selected" : ""}`}
                key={0}
                onClick={() => setFilter('')}
            >
                Все
            </button>
            {departmentsData?.departments.map((department) => (
                <button
                    className={`filters-departments__item ${filter === department.title ? "selected" : ""}`}
                    key={department.id_department}
                    onClick={() => setFilter(department.title)}
                >
                    {department.title}
                </button>
            ))}
        </div>
    );
};
