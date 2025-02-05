import { FC } from "react";

interface INotification {
    content: string;
    date: string;
}

export const Notification: FC<INotification> = (props) => {
    return (
        <div className="notification">
            <span className="title">{props.content}</span>
            <div className="date">{props.date}</div>
        </div>
    );
};
