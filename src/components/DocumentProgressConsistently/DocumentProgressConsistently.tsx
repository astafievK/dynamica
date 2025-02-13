import { FC } from "react";
import { motion } from "framer-motion";

const statuses = [
    { label: "Выполнено", color: "lime" },
    { label: "В процессе", color: "orange" },
    { label: "Невозможно", color: "gray" },
];

const progressData = [
    { status: true, division: "Центральный маркетинг", person: "Максим Александров" },
    { status: true, division: "Служба безопасности", person: "Алексей Усачев" },
    { status: false, division: "Юристы", person: "Неизвестный Юрист" },
    { status: false, division: "Бухгалтерия", person: "Неизвестный Бухгалтер" },
];

export const DocumentProgressConsistently: FC = () => {
    let inProcessFound = false;

    const adjustedData = progressData.map((point) => {
        if (!point.status && !inProcessFound) {
            inProcessFound = true;
            return { ...point, status: "В процессе" };
        }
        return inProcessFound ? { ...point, status: "Невозможно" } : { ...point, status: "Выполнено" };
    });

    return (
        <div className="progress-bar-container">
            {adjustedData.map((point, index) => {
                const status = statuses.find((s) => s.label === point.status);
                const nextStatus = adjustedData[index + 1]?.status;
                const nextColor = statuses.find((s) => s.label === nextStatus)?.color || "gray";
                const isLimeToOrange = status?.label === "Выполнено" && nextStatus === "В процессе";

                return (
                    <div key={index} className="progress-item">
                        <div className="progress-point-wrapper">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5}}
                                className={`progress-point ${status?.color}`}
                            >
                                {point.status === "В процессе" && <div className="pulse"></div>}
                            </motion.div>
                            <div
                                className="progress-label"
                            >
                                <span className="progress-label__division">{point.division}</span>
                                <span className="progress-label__person">{point.person}</span>
                            </div>
                        </div>
                        {index < adjustedData.length - 1 && (
                            <div className={`progress-line ${isLimeToOrange ? "lime-orange-gradient" : nextColor}`}></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
