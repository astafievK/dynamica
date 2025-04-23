import React, { FC, useRef, useState } from "react";
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CakeIcon from '@mui/icons-material/Cake';
import { usePatchUserEmailMutation } from "../../../../api/methods/userApi.ts";
import { Employee } from "../../../../api/interfaces/IEmployee.ts";
import { useNotification } from "../../../Contexts/NotificationContext/NotificationContext.tsx";

interface DetailsItemProps {
    title: string;
    value: string;
    isReadOnly?: boolean;
    employee: Employee;
}

const iconMap: Record<string, JSX.Element> = {
    "Должность": <BadgeRoundedIcon />,
    "Подразделение": <GroupRoundedIcon />,
    "Контактный телефон": <PhoneRoundedIcon />,
    "Почта": <EmailRoundedIcon />,
    "День рождения": <CakeIcon />
};

export const DetailsItem: FC<DetailsItemProps> = ({ title, value, isReadOnly = true, employee }) => {
    const [tempValue, setTempValue] = useState<string>(value);
    const [changeUserEmail, { isLoading }] = usePatchUserEmailMutation();
    const { notify } = useNotification();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSetUserEmail = async () => {
        try {
            const response = await changeUserEmail({
                id_user: employee.id_user,
                email: tempValue
            }).unwrap();

            if (response.status === "success") {
                notify({ title: "Изменение почты", message: "Рабочая почта сотрудника изменена" });
            } else {
                console.error(response);
                notify({ title: "Ошибка", message: response.message || "Ошибка изменения почты сотрудника" });
            }
        } catch (error) {
            console.error("Ошибка изменения почты:", error);
            notify({ title: "Ошибка", message: "Неизвестная ошибка" });
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (title === "Почта") {
            const target = e.target as HTMLElement;
            if (
                containerRef.current &&
                !containerRef.current.querySelector("input")?.contains(target) &&
                !containerRef.current.querySelector("button")?.contains(target)
            ) {
                window.location.href = `mailto:${value}`;
            }
        }
    };

    const content = (
        <>
            <div className="details-title">
                {iconMap[title]}
                <span>{title}</span>
            </div>
            <span className="detail">{value}</span>
        </>
    );

    if (title === "Почта" && isReadOnly) {
        return (
            <a href={`mailto:${value}`} className="details-item mailto-link">
                {content}
            </a>
        );
    }

    return (
        <div
            className="details-item"
            onClick={handleClick}
            ref={containerRef}
        >
            <div className="details-title">
                {iconMap[title]}
                <span>{title}</span>
            </div>
            {
                isReadOnly ? (
                    <span className="detail">{value}</span>
                ) : (
                    <div className="detail-container">
                        <input
                            className="detail"
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onKeyDown={async (e) => {
                                if (e.key === "Enter" && tempValue !== value && !isLoading) {
                                    e.preventDefault();
                                    await handleSetUserEmail();
                                }
                            }}
                            disabled={isLoading}
                        />
                        <button
                            onClick={async (e) => {
                                e.stopPropagation();
                                await handleSetUserEmail();
                            }}
                            disabled={tempValue === value || isLoading}
                        >
                            {isLoading && <span className="shimmer"></span>}
                            <SaveOutlinedIcon />
                        </button>
                    </div>
                )
            }
        </div>
    );
};
