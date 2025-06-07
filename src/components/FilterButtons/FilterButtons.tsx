import React, { FC } from "react";
import { FilterDepartmentSkeleton } from "../Skeletons/FilterDepartmentSkeleton.tsx";
import './FilterButtons.css'

interface FilterButtonsProps<T> {
    filter: T | null;
    setFilter: (filter: T) => void;
    data: T[] | undefined;
    isLoading?: boolean;
    renderLabel: (item: T) => string;
}

export const FilterButtons: FC<FilterButtonsProps<string>> = React.memo(({ filter, setFilter, data, isLoading, renderLabel }) => {
    return (
        <div className="filters-buttons">
            {isLoading ? (
                [...Array(3)].map((_, index) => (
                    <FilterDepartmentSkeleton key={index} />
                ))
            ) : (
                <>
                    <button
                        className={`filter-elem ${filter === "" ? "selected" : ""}`}
                        onClick={() => setFilter("")}
                    >
                        Все
                    </button>
                    {data?.map((item, index) => (
                        <button
                            className={`filter-elem ${filter === item ? "selected" : ""}`}
                            key={index}
                            onClick={() => setFilter(item)}
                        >
                            {renderLabel(item)}
                        </button>
                    ))}
                </>
            )}
        </div>
    );
});
