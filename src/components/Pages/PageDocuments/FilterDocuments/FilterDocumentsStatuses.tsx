import { FC } from "react";

interface FilterDocumentsStatusesProps {
    filter: string | null;
    setFilter: (filter: string) => void;
}

const documentsStatuses = [
    "Все",
    "Новые",
    "На редактирование",
    "Отклоненные",
    "Архив",
];

export const FilterDocumentsStatuses: FC<FilterDocumentsStatusesProps> = ({ filter, setFilter }) => {
    return (
        <div className="filter-documents-statuses">
            {documentsStatuses.map((status, index) => (
                <button
                    className={`filter-documents-statuses__button filter-elem ${filter === status ? "selected" : ""}`}
                    key={index}
                    onClick={() => setFilter(status ?? '')}
                >
                    {status}
                </button>
            ))}
        </div>
    );
};
