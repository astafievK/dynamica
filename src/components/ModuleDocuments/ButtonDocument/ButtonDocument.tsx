import { FC } from "react";

interface IButtonDocumentProps {
    title: string;
    deadline: string;
    status: string;
    currentDate: Date;
}

export const ButtonDocument: FC<IButtonDocumentProps> = (props) => {
    const [day, month] = props.deadline.split(".").map(Number);
    const deadlineDate = new Date(props.currentDate.getFullYear(), month - 1, day);

    const timeDifference = deadlineDate.getTime() - props.currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const getStatusClass = () => {
        if (props.status === "просрочено") {
            return "status-end";
        }
        if (props.status === "открыто") {
            if (daysDifference <= 0) {
                return "status-end";
            } else if (daysDifference <= 7) {
                return "status-soon";
            } else {
                return "status-active";
            }
        }
        return "status-default";
    };

    return (
        <div className="document">
            <div className="document-title">{props.title}</div>
            <div className="info">
                <span className="document-deadline">до {props.deadline}</span>
                <div className={`document-status ${getStatusClass()}`}>{props.status}</div>
            </div>
        </div>
    );
};
