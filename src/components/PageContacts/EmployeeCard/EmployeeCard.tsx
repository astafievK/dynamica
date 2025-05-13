import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Employee } from "../../../interfaces/IEmployee.ts";
import {useUploadImage} from "../../../store/hooks/useUploadImage.ts";
import { DetailsItem } from "./DetailsItem/DetailsItem.tsx";
import {useDeleteProfileImageMutation, usePatchUserVisibilityMutation} from "../../../api/methods/userApi.ts";
import {useTypedSelector} from "../../../store/hooks/redux.ts";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {useNotification} from "../../Contexts/NotificationContext/NotificationContext.tsx";
import { monthsGenitive } from "../../../constants/months.ts";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useEditEmployee } from "../../Contexts/EditEmployeeContext/EditEmployeeContext";
import { useCopyToClipboard } from "../../../store/hooks/useCopyToClipboard.ts";

interface IEmployeeCardProps {
    employee: Employee;
}

export const EmployeeCard: FC<IEmployeeCardProps> = React.memo(({ employee }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPreviewClicked, setIsPreviewClicked] = useState(false);
    const {handleFileChange, isLoading,} = useUploadImage(employee);
    const {notify} = useNotification();
    const [deleteProfileImage, {isLoading: deleteImageIsLoading}] = useDeleteProfileImageMutation();
    const [changeUserVisibility, {isLoading: changeUserVisibilityIsLoading}] = usePatchUserVisibilityMutation();
    const {user} = useTypedSelector(state => state.auth)
    const { copyToClipboard } = useCopyToClipboard();

    const { openModal } = useEditEmployee();

    const handleDeleteImageClick = async () => {
        try {
            const response = await deleteProfileImage({id_user: employee.id_user}).unwrap();

            if (response.status === "success") {
                notify({title: "Удаление фото", message: "Фото успешно удалено"});
            } else {
                notify({title: "Ошибка", message: response.message || "Ошибка удаления фото"});
            }
        } catch (error) {
            console.error("Ошибка при удалении фото:", error);
            notify({title: "Ошибка изменения видимости", message: "Неизвестная ошибка"});
        }
    };

    const handleChangeUserVisibility = async () => {
        try {
            const response = await changeUserVisibility({id_user: employee.id_user}).unwrap();

            if (response.status === "success") {
                notify({message: "Видимость сотрудника изменена"});
            } else {
                console.error(response)
                notify({title: "Ошибка", message: response.message || "Ошибка изменения видимости сотрудника"});
            }
        } catch (error) {
            console.error("Ошибка изменения видимости:", error);
            notify({title: "Ошибка", message: "Неизвестная ошибка"});
        }
    }

    const handlePreviewClick = () => {
        setIsPreviewClicked(prev => !prev);
    }

    const handleCopy = async (text: string, target: string, event: React.MouseEvent) => {
        event.stopPropagation();
        try {
            await copyToClipboard(text);
            notify({message: `${target} скопировано` });
        } catch (error) {
            console.error("Ошибка при копировании:", error);
            notify({message: `${target} скопировано` });
        }
    };

    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4}}
                className={`employee-card ${(isHovering) ? 'hovered' : ''} ${isPreviewClicked ? 'fixed' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div
                    className={`employee-card__preview ${employee.is_hidden ? 'hidden' : ''}`}
                    onClick={handlePreviewClick}
                >
                    {
                        user && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.25}}
                                    className="employee-actions">
                                    <div className="employee-actions-photo employee-actions-item">
                                        <button className="employee-action" onClick={() => openModal(employee)}>
                                            <ModeEditOutlineOutlinedIcon />
                                        </button>
                                        <label className="employee-action">
                                            <PortraitOutlinedIcon/>
                                            {isLoading && <span className="shimmer"></span>}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden-input"
                                                onChange={handleFileChange}
                                                disabled={isLoading}
                                            />
                                        </label>
                                        {
                                            employee.image.path !== 'default.webp' && (
                                                <button className="employee-action" onClick={handleDeleteImageClick}
                                                        disabled={deleteImageIsLoading}>
                                                    {deleteImageIsLoading && <span className="shimmer"></span>}
                                                    <DeleteForeverOutlinedIcon/>
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className="employee-actions-hide employee-actions-item">
                                        <button className="employee-action" onClick={handleChangeUserVisibility}
                                                disabled={changeUserVisibilityIsLoading}>
                                            {changeUserVisibilityIsLoading && <span className="shimmer"></span>}
                                            {
                                                employee.is_hidden && <VisibilityOutlinedIcon/>
                                            }
                                            {
                                                !(employee.is_hidden) && <VisibilityOffOutlinedIcon/>
                                            }
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        )
                    }
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                        className="employee-card__photo"
                        style={{backgroundImage: `url(https://192.168.7.74/files/images/${employee.image.path})`}}
                    >
                    </motion.div>
                    <div className="employee-card__general">
                        <div className="employee-card__name" onClick={(event) => handleCopy(`${employee.surname} ${employee.name} ${employee.patronymic}`, 'ФИО', event)}>
                            <span className="employee-card__lastname">{employee.surname}</span>
                            <span className="employee-card__firstname">{employee.name}</span>
                            <span className="employee-card__middlename">{employee.patronymic}</span>
                        </div>
                        <span className="employee-card__position" onClick={(event) => handleCopy(employee.position.title, 'Должность', event)}>{employee.position.title}</span>
                    </div>
                </div>

                <AnimatePresence>
                    {(isHovering || isPreviewClicked) && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.1}}
                            className="employee-card__details"
                        >
                            {(user || employee.email) && (
                                <DetailsItem
                                    title="Почта"
                                    value={employee.email ?? ''}
                                    isReadOnly={!user}
                                    employee={employee}
                                />
                            )}
                            {employee.phone && (
                                <DetailsItem title="Контактный телефон" value={employee.phone} employee={employee}/>
                            )}
                            {employee.department.title && (
                                <DetailsItem title="Подразделение" value={employee.department.title} employee={employee}/>
                            )}
                            {employee.department.city && (
                                <DetailsItem title="Населенный пункт" value={employee.department.city.title} employee={employee}/>
                            )}
                            {employee.birthday && (
                                (() => {
                                    const birthday = employee.birthday.date;
                                    const birthDate = new Date(birthday);
                                    const birthMonth = birthDate.getMonth() + 1;

                                    return (
                                        <DetailsItem
                                            title="День рождения"
                                            value={`${birthDate.getDate()} ${monthsGenitive[birthMonth].toLowerCase()}`}
                                            employee={employee}
                                        />
                                    );
                                })()
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
})