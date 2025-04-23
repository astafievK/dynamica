import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Employee } from "../../../api/interfaces/IEmployee.ts";
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

interface IEmployeeCardProps {
    employee: Employee;
}

export const EmployeeCard: FC<IEmployeeCardProps> = ({ employee }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isFocusedInside, setIsFocusedInside] = useState(false);
    const {handleFileChange, isLoading,} = useUploadImage(employee);
    const {notify} = useNotification();
    const [deleteProfileImage, {isLoading: deleteImageIsLoading}] = useDeleteProfileImageMutation();
    const [changeUserVisibility, {isLoading: changeUserVisibilityIsLoading}] = usePatchUserVisibilityMutation();
    const {user} = useTypedSelector(state => state.auth)

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
                notify({title: "Изменение видимости", message: "Видимость сотрудника изменена"});
            } else {
                console.error(response)
                notify({title: "Ошибка", message: response.message || "Ошибка изменения видимости сотрудника"});
            }
        } catch (error) {
            console.error("Ошибка изменения видимости:", error);
            notify({title: "Ошибка", message: "Неизвестная ошибка"});
        }
    }

    const handleFocusIn = () => setIsFocusedInside(true);

    const handleFocusOut = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocusedInside(false);
        }
    };

    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.25}}
                className={`employee-card ${isHovering ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className={`employee-card__preview ${employee.is_hidden ? 'hidden' : ''}`}>
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
                    <div
                        className="employee-card__photo"
                        style={{backgroundImage: `url(http://192.168.7.74/files/images/${employee.image.path})`}}
                    >
                        {
                            /*
                            <AnimatePresence>
                            {
                                (isHovering || isLoading) && (
                                    <motion.div
                                        initial={{ opacity: 0, top: 0 }}
                                        animate={{ opacity: 1, top: 3 }}
                                        exit={{ opacity: 0, top: 0 }}
                                        transition={{ duration: 0.15, ease: "easeInOut" }}
                                        className="upload-container"
                                    >
                                        <label className="upload-photo photo-item">
                                            Загрузить
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
                                                <button className="delete-photo photo-item" onClick={handleDeleteImageClick} disabled={deleteImageIsLoading}>
                                                    {deleteImageIsLoading && <span className="shimmer"></span>}
                                                    <MdDeleteForever size={20} />
                                                </button>
                                            )
                                        }
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                             */
                        }
                    </div>
                    <div className="employee-card__general">
                        <div className="employee-card__name">
                            <span className="employee-card__lastname">{employee.surname}</span>
                            <span className="employee-card__firstname">{employee.name}</span>
                            <span className="employee-card__middlename">{employee.patronymic}</span>
                        </div>
                        <span className="employee-card__position">{employee.position.title}</span>
                    </div>
                </div>

                <AnimatePresence>
                    {(isHovering || isFocusedInside) && (
                        <motion.div
                            initial={{opacity: 0, bottom: 0}}
                            animate={{opacity: 1, bottom: 10}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.15, ease: "easeInOut"}}
                            className="employee-card__details"
                            onFocus={handleFocusIn}
                            onBlur={handleFocusOut}
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
                            {employee.department.division && (
                                <DetailsItem title="Подразделение" value={employee.department.division.title}
                                             employee={employee}/>
                            )}
                            {employee.birthday && (
                                (() => {
                                    const birthday = employee.birthday.date;
                                    const birthDate = new Date(birthday);
                                    const birthMonth = birthDate.getMonth() + 1;

                                    return (
                                        <DetailsItem
                                            title="День рождения"
                                            value={`${birthMonth} ${monthsGenitive[birthMonth].toLowerCase()}`}
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
}