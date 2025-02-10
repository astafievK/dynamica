import { FC } from "react";

interface IButtonNotificationProps {
    title: string;
    date: string;
}

export const ButtonNotification: FC<IButtonNotificationProps> = (props) => {
    return (
        <div className="notification">
            <span className="title">{props.title}</span>
            <div className="date">{props.date}</div>
        </div>
    );
};
