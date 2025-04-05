import { FC, useState } from "react";
import { pageAnimation } from "../../../constants/motionSettins.ts";
import { AnimatePresence, motion } from "framer-motion";
import { Employee } from "../../../api/interfaces/IEmployee.ts";
import { ModalUserNotification } from "../../Modals/ModalUserNotification/ModalUserNotification.tsx";
import {useUploadImage} from "../../../store/hooks/useUploadImage.ts";
import { DetailsItem } from "./DetailsItem/DetailsItem.tsx";
import {MdDeleteForever} from "react-icons/md";
import {useDeleteProfileImageMutation} from "../../../api/methods/userApi.ts";

interface IEmployeeCardProps {
    employee: Employee;
}

export const EmployeeCard: FC<IEmployeeCardProps> = ({ employee }) => {
    const [isHovering, setIsHovering] = useState(false);
    const { handleFileChange, isLoading, notification, setNotification } = useUploadImage(employee);
    const [deleteProfileImage, { isLoading: deleteImageIsLoading }] = useDeleteProfileImageMutation();

    const handleDeleteImageClick = async () => {
        try {
            const response = await deleteProfileImage({ id_user: employee.id_user }).unwrap();

            if (response.status === "success") {
                setNotification({ title: "Удаление фото", message: "Фото успешно удалено" });
            } else {
                setNotification({ title: "Ошибка", message: response.message || "Ошибка удаления фото" });
            }
        } catch (error) {
            console.error("Ошибка при удалении фото:", error);
            setNotification({ title: "Ошибка", message: "Неизвестная ошибка" });
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
                {...pageAnimation}
                className={`employee-card ${isHovering ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="employee-card__preview">
                    <div
                        className="employee-card__photo"
                        style={{ backgroundImage: `url(http://192.168.7.74/files/images/${employee.image.path})` }}
                    >
                        <AnimatePresence>
                            {
                                (isHovering || isLoading) && (
                                    <motion.div
                                        initial={{ opacity: 0, bottom: 0 }}
                                        animate={{ opacity: 1, bottom: 3 }}
                                        exit={{ opacity: 0, bottom: 0 }}
                                        transition={{ duration: 0.1 }}
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
                    {isHovering && (
                        <motion.div
                            initial={pageAnimation.initial}
                            animate={pageAnimation.animate}
                            exit={pageAnimation.exit}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className="employee-card__details"
                        >
                            {employee.department.division && <DetailsItem title="Подразделение" value={employee.department.division.title} /> }
                            {employee.phone && <DetailsItem title="Контактный телефон" value={employee.phone} />}
                            {employee.email && <DetailsItem title="Почта" value={employee.email} />}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};
