import { FC } from "react";
import {useRippleEffect} from "../../../store/hooks/useRippleEffect.ts";

interface IButtonNotificationProps {
    title: string;
    date: string;
}

export const ButtonNotification: FC<IButtonNotificationProps> = (props) => {
    const createRipple = useRippleEffect();

    return (
        <button className="notification" onClick={createRipple}>
            <span className="title">{props.title}</span>
            <span className="date">{props.date}</span>
        </button>
    );
};
