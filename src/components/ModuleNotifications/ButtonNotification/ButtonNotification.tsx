import { FC } from "react";

interface IButtonNotificationProps {
    title: string;
    date: string;
}

export const ButtonNotification: FC<IButtonNotificationProps> = (props) => {
    return (
        <button className="notification">
            <span className="title">{props.title}</span>
            <span className="date">{props.date}</span>
        </button>
    );
};
