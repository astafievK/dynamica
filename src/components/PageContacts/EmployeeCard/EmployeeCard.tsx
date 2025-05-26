import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Employee } from "../../../interfaces/IEmployee.ts";
import {useTypedSelector} from "../../../store/hooks/redux.ts";
import {useNotification} from "../../Contexts/NotificationContext/NotificationContext.tsx";
import { useCopyToClipboard } from "../../../store/hooks/useCopyToClipboard.ts";
import {EmployeeActions} from "./EmployeeActions.tsx";
import { EmployeeDetails } from "./EmployeeDetails.tsx";
import {handleCopyUtil} from "../../../utils/handleCopy.ts";

interface IEmployeeCardProps {
    employee: Employee;
}

export const EmployeeCard: FC<IEmployeeCardProps> = React.memo(({ employee }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPreviewClicked, setIsPreviewClicked] = useState(false);
    const {notify} = useNotification();
    const {user} = useTypedSelector(state => state.auth)
    const { copyToClipboard } = useCopyToClipboard();

    const handlePreviewClick = () => {
        setIsPreviewClicked(prev => !prev);
        setIsHovering(false);
    }

    const handleCopy = async (text: string, target: string, event: React.MouseEvent) => {
        await handleCopyUtil(event, text, target, copyToClipboard, notify);
    };

    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.15}}
                className={`employee-card ${(isHovering) ? 'hovered' : ''} ${isPreviewClicked ? 'fixed' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className={`employee-card__preview ${employee.is_hidden ? 'hidden' : ''}`} onClick={handlePreviewClick}>
                    <div
                        className="employee-card__photo"
                        style={{backgroundImage: `url(https://newportal/files/images/${employee.image.path})`}}
                    >
                    </div>
                    <div className="employee-card__general">
                        <div className="employee-card__name" onClick={(event) => handleCopy(`${employee.surname} ${employee.name} ${employee.patronymic}`, 'ФИО', event)}>
                            <span className="employee-card__lastname">{employee.surname}</span>
                            <span className="employee-card__firstname">{employee.name}</span>
                            <span className="employee-card__middlename">{employee.patronymic}</span>
                        </div>
                        <div className="employee-card__position" onClick={(event) => handleCopy(employee.position.title, 'Должность', event)}>
                            <span>{employee.position.title}</span>
                        </div>
                    </div>
                    {
                        user && (
                            <AnimatePresence>
                                <EmployeeActions employee={employee} />
                            </AnimatePresence>
                        )
                    }
                </div>

                <AnimatePresence>
                    {(isHovering || isPreviewClicked) && (
                        <EmployeeDetails employee={employee}/>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
})