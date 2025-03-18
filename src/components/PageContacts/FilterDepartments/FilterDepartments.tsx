import { FC } from "react";
import { useGetDepartmentsNotNullQuery } from "../../../api/methods/departmentApi.ts";
import {FilterDepartmentSkeleton} from "../../Skeletons/FilterDepartmentSkeleton.tsx";

interface FilterDepartmentsProps {
    filter: string | null;
    setFilter: (filter: string) => void;
}

export const FilterDepartments: FC<FilterDepartmentsProps> = ({ filter, setFilter }) => {
    const { data: departmentsData, isLoading } = useGetDepartmentsNotNullQuery();

    return (
        <div className="filters-departments">
            {isLoading ? (
                [...Array(3)].map((_, index) => (
                    <FilterDepartmentSkeleton key={index} />
                ))
            ) : (
                <>
                    <button
                        className={`department ${filter === "" ? "selected" : ""}`}
                        key={0}
                        onClick={() => setFilter("")}
                    >
                        Все
                    </button>
                    {departmentsData?.departments.map((department) => (
                        <button
                            className={`department ${filter === department.title ? "selected" : ""}`}
                            key={department.id_department}
                            onClick={() => setFilter(department.title ?? '')}
                        >
                            {department.title}
                        </button>
                    ))}
                </>
            )}
        </div>
    );
};

