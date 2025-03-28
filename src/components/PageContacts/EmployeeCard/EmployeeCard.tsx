import React, { FC, useState } from "react";
import { pageAnimation } from "../../../constants/motionSettins.ts";
import { AnimatePresence, motion } from "framer-motion";
import { Employee } from "../../../api/interfaces/IEmployee.ts";
import {useUploadProfileImageMutation} from "../../../api/methods/userApi.ts";
import {ModalUserNotification} from "../../Modals/ModalUserNotification/ModalUserNotification.tsx";

interface IEmployeeCardProps {
    employee: Employee;
}

export const EmployeeCard: FC<IEmployeeCardProps> = ({ employee }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [uploadProfileImage, {isLoading: isImageUploading}] = useUploadProfileImageMutation();
    const [notification, setNotification] = useState<{ title?: string; message: string } | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("id_user", employee.id_user.toString());

            try {
                const response = await uploadProfileImage(formData).unwrap();

                setNotification({ title: "Загрузка фото сотрудника", message: response.message || "Фото сотрудника обновлено" });
            } catch (error) {
                setNotification({ title: "Загрузка фото сотрудника", message: "Неизвестная ошибка" });
            }
        }
    };

    return (
        <>
            {notification && (
                <ModalUserNotification
                    title={notification.title}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            <motion.div
                initial={pageAnimation.initial}
                animate={pageAnimation.animate}
                exit={pageAnimation.exit}
                transition={{duration: 0.25}}
                className={`employee-card ${isHovering ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="employee-card__preview">
                    <div className="employee-card__photo"
                         style={{backgroundImage: `url(http://192.168.7.74/files/images/${employee.image.path})`}}>
                        <AnimatePresence>
                            {
                                (isHovering || isImageUploading) && (
                                    <motion.label
                                        initial={{opacity: 0, bottom: 0}}
                                        animate={{opacity: 1, bottom: 10}}
                                        exit={{opacity: 0, bottom: 0}}
                                        transition={{duration: 0.05}}
                                        className="upload-photo"
                                    >
                                        Загрузить
                                        {isImageUploading && <span className="shimmer"></span>}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden-input"
                                            onChange={handleFileChange}
                                            disabled={isImageUploading}
                                        />
                                    </motion.label>
                                )
                            }
                        </AnimatePresence>
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
                    {
                        isHovering &&
                        <motion.div
                            initial={pageAnimation.initial}
                            animate={pageAnimation.animate}
                            exit={pageAnimation.exit}
                            transition={{duration: 0.1}}
                            className="employee-card__details">
                            {
                                employee.department.division &&
                                <div className="details-item details-item__division">
                                    <span className="details-title">Подразделение</span>
                                    <span className="detail">{employee.department.division.title}</span>
                                </div>
                            }
                            {
                                employee.phone &&
                                <div className="details-item details-item__phone">
                                    <span className="details-title">Контактный телефон</span>
                                    <span className="detail">{employee.phone}</span>
                                </div>
                            }
                            {
                                employee.email &&
                                <div className="details-item details-item__email">
                                    <span className="details-title">Почта</span>
                                    <span className="detail">{employee.email}</span>
                                </div>
                            }
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
        </>
    );
}
