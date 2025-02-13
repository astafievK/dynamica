import { FC } from "react";

const data = [
    { status: 'В процессе', division: "Центральный маркетинг", person: "Максим Александров" },
    { status: 'Подписано', division: "Служба безопасности", person: "Алексей Усачев" },
    { status: 'Подписано', division: "Юристы", person: "Неизвестный Юрист" },
    { status: 'В процессе', division: "Бухгалтерия", person: "Неизвестный Бухгалтер" },
];

export const DocumentProgressParallel: FC = () => {
    return (
        <div className="document-status__parallel">
            <div className="statuses-container">
                {data.map((item, index) => {
                    const statusClass = item.status === 'Подписано' ? 'lime' : 'orange';
                    return (
                        <div key={index} className={`status-item ${statusClass}`}>
                            <div className="status-label">
                                <span className="status-label__division">{item.division}</span>
                                <span className="status-label__person">{item.person}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
