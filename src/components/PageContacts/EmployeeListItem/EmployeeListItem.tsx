import React, { FC, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IUser } from "../../../interfaces/IUser.ts";
import {useNotification } from "../../Contexts/NotificationContext/NotificationContext.tsx";
import { useCopyToClipboard } from "../../../store/hooks/useCopyToClipboard.ts";
import { EmployeeActions } from "./EmployeeActions/EmployeeActions.tsx";
import { EmployeeDetails } from "./EmployeeDetails/EmployeeDetails.tsx";
import { handleCopyUtil } from "../../../utils/handleCopy.ts";
import { useHasPermission } from "../../../store/hooks/useHasPermission.ts";
import { Permissions } from "../../../constants/permissions.ts";
import "./EmployeeListItem.css"

interface IEmployeeCardProps {
    employee: IUser;
}

export const EmployeeListItem: FC<IEmployeeCardProps> = React.memo(({ employee }) => {
    const {notify} = useNotification();
    const {copyToClipboard} = useCopyToClipboard();

    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const canViewActions = useHasPermission(
        [Permissions.Superuser, Permissions.UpdateUsers],
        'any'
    )

    const handleMouseEnter = () => {
        if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                setIsHovered(true);
                timeoutRef.current = null;
            }, 200);
        }
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        } else {
            setIsHovered(false);
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleCopy = async (text: string, target: string, event: React.MouseEvent) => {
        await handleCopyUtil(event, text, target, copyToClipboard, notify);
    };

    return (
        <div className="employees-list-item">
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.17}}
                className={`employee-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={`employee-card__preview ${employee.is_hidden ? 'hidden' : ''}`}>
                    <div
                        className="employee-card__photo"
                        style={{backgroundImage: `url(https://newportal/files/images/${employee.image.path})`}}
                    />
                    <div className="employee-card__general">
                        <div
                            className="employee-card__name"
                            onClick={(event) =>
                                handleCopy(`${employee.surname} ${employee.name} ${employee.patronymic}`, 'ФИО', event)
                            }
                        >
                            <span className="employee-card__lastname">{employee.surname}</span>
                            <span className="employee-card__firstname">{employee.name}</span>
                            <span className="employee-card__middlename">{employee.patronymic}</span>
                        </div>
                        <div
                            className="employee-card__position"
                            onClick={(event) => handleCopy(employee.position.title, 'Должность', event)}
                        >
                            <span>{employee.position.title}</span>
                        </div>
                    </div>
                    {canViewActions && (
                        <AnimatePresence>
                            <EmployeeActions employee={employee}/>
                        </AnimatePresence>
                    )}
                </div>
                <EmployeeDetails employee={employee}/>
            </motion.div>
        </div>
    );
})