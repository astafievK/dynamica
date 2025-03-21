import { FC } from "react";
import {
    useGetDepartmentsTitlesNotNullQuery
} from "../../../api/methods/departmentApi.ts";
import {FilterDepartmentSkeleton} from "../../Skeletons/FilterDepartmentSkeleton.tsx";

interface FilterDepartmentsProps {
    filter: string | null;
    setFilter: (filter: string) => void;
}

export const FilterDepartments: FC<FilterDepartmentsProps> = ({ filter, setFilter }) => {
    const { data: departmentsData, isLoading } = useGetDepartmentsTitlesNotNullQuery();

    return (
        <div className="filters-departments">
            {isLoading ? (
                [...Array(3)].map((_, index) => (
                    <FilterDepartmentSkeleton key={index} />
                ))
            ) : (
                <>
                    <button
                        className={`department filter-elem ${filter === "" ? "selected" : ""}`}
                        key={0}
                        onClick={() => setFilter("")}
                    >
                        Все
                    </button>
                    {departmentsData?.titles.map((title, index) => (
                        <button
                            className={`department filter-elem ${filter === title ? "selected" : ""}`}
                            key={index}
                            onClick={() => setFilter(title ?? '')}
                        >
                            {title}
                        </button>
                    ))}
                </>
            )}
        </div>
    );
};

