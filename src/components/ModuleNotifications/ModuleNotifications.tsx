import {FC} from "react";
import {ButtonNotification} from "./ButtonNotification/ButtonNotification.tsx";

export const ModuleNotifications: FC = () => {
    return(
        <div className="module-notifications">
            <div className="module-body">
                <ButtonNotification title={"Тестовое уведомление 1"} date={"01.01.2025"}/>
                <ButtonNotification title={"Тестовое уведомление 1"} date={"01.01.2025"}/>
                <ButtonNotification title={"Тестовое уведомление 1"} date={"01.01.2025"}/>
                <ButtonNotification title={"Тестовое уведомление 1"} date={"01.01.2025"}/>
                <ButtonNotification title={"Тестовое уведомление 1"} date={"01.01.2025"}/>
                <ButtonNotification title={"Тестовое уведомление 1"} date={"01.01.2025"}/>
                <ButtonNotification title={"Тестовое уведомление 1"} date={"01.01.2025"}/>
                <ButtonNotification title={"Тестовое уведомление 1"} date={"01.01.2025"}/>
                <ButtonNotification title={"Тестовое уведомление 1"} date={"01.01.2025"}/>
            </div>
        </div>
    )
}