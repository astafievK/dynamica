import { FC, useState } from "react";
import { useGetDepartmentsQuery } from "../../../api/methods/departmentApi.ts";

export const FilterDepartments: FC = () => {
    const { data: departmentsData } = useGetDepartmentsQuery();

    const [activeFilter, setActiveFilter] = useState<number | null>(
        departmentsData?.departments[0]?.id_department ?? null
    );

    return (
        <div className="filters-departments">
            {departmentsData?.departments.map((department) => (
                <button
                    className={`filters-departments__item ${activeFilter === department.id_department ? "selected" : ""}`}
                    key={department.id_department}
                    onClick={() => setActiveFilter(department.id_department)}
                >
                    {department.title}
                </button>
            ))}
        </div>
    );
};
