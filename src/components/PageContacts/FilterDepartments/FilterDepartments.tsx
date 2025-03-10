import {FC, useState} from "react";

const filters = [
    "Подразделение 1",
    "Подразделение 2",
    "Подразделение 3",
    "Подразделение 4",
    "Подразделение 5",
    "Подразделение 6",
    "Подразделение 7",
    "Подразделение 8",
    "Подразделение 9",
    "Подразделение 10",
    "Подразделение 11",
    "Подразделение 12",
    "Подразделение 13",
    "Подразделение 14",
    "Подразделение 15",
    "Подразделение 16",
    "Подразделение 17", ];

export const FilterDepartments: FC = () => {
    const [activeFilter, setActiveFilter] = useState(filters[0]);

    return (
        <div className={"filters-departments"}>
            {filters.map((filter) => (
                <button
                    className={`filters-departments__item ${activeFilter === filter ? "selected" : ""}`}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}>
                    {filter}
                </button>
            ))}
        </div>
    );
}
