import React, { FC, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IUser } from "../../../../interfaces/IUser.ts";
import {useNotification } from "../../../Contexts/NotificationContext/NotificationContext.tsx";
import { useCopyToClipboard } from "../../../../store/hooks/useCopyToClipboard.ts";
import { EmployeeActions } from "./EmployeeActions/EmployeeActions.tsx";
import { EmployeeDetails } from "./EmployeeDetails/EmployeeDetails.tsx";
import { handleCopyUtil } from "../../../../utils/handleCopy.ts";
import { useHasPermission } from "../../../../store/hooks/useHasPermission.ts";
import { Permissions } from "../../../../constants/permissions.ts";
import "./EmployeeListItem.css"
import { getNextZIndex } from "./hooks/getNextZIndex.ts";
import {pageAnimation} from "../../../../constants/pageAnimation.ts";

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
    const [zIndex, setZIndex] = useState<number>(1);

    const isPointerInsideRef = useRef(false);

    const handleMouseEnter = () => {
        isPointerInsideRef.current = true;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        timeoutRef.current = setTimeout(() => {
            if (isPointerInsideRef.current) {
                const nextZIndex = getNextZIndex();
                setZIndex(nextZIndex);
                setIsHovered(true);
            }
            timeoutRef.current = null;
        }, 350);
    };

    const handleMouseLeave = () => {
        isPointerInsideRef.current = false;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
            setZIndex(1);
            timeoutRef.current = null;
        }, 100);
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
                {...pageAnimation}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`employee-card ${isHovered ? 'hovered' : ''}`}
                style={{ zIndex }}
            >
                <div className={`employee-card__preview ${employee.is_hidden ? 'hidden' : ''}`}>
                    <motion.div {...pageAnimation} className="image-wrapper">
                        {employee.image.path ? (
                            <img
                                className="employee-card__photo"
                                src={`https://newportal/files/images/${employee.image.path}`}
                                alt={employee.name}
                                loading="lazy"
                            />
                        ) : (
                            <span className="image-wrapper-label">
                              {employee.surname[0]} {employee.name[0]}
                            </span>
                        )}
                    </motion.div>

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
                            <EmployeeActions employee={employee} />
                        </AnimatePresence>
                    )}
                </div>
                {
                    isHovered && <EmployeeDetails employee={employee} />
                }

            </motion.div>
        </div>
    );
})