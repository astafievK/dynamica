import React, { FC } from "react";
import { FilterDepartmentSkeleton } from "../Skeletons/FilterDepartmentSkeleton.tsx";
import './FilterButtons.css'

interface FilterButtonsProps {
    filter: string | null;
    setFilter: (filter: string) => void;
    data: string[] | undefined;
    isLoading?: boolean;
    renderLabel: (item: string) => string;
}

export const FilterButtons: FC<FilterButtonsProps> = React.memo(({ filter, setFilter, data, isLoading, renderLabel }) => {
    return (
        <div className="filters-buttons">
            {isLoading ? (
                [...Array(3)].map((_, index) => (
                    <FilterDepartmentSkeleton key={index} />
                ))
            ) : (
                <>
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
