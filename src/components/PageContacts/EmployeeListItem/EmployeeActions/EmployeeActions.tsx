import React, { FC } from "react";
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { motion } from "framer-motion";
import { IUser } from "../../../../interfaces/IUser.ts";
import { useNotification } from "../../../Contexts/NotificationContext/NotificationContext.tsx";
import { useUploadImage } from "../../../../store/hooks/useUploadImage.ts";
import { useEditEmployee } from "../../../Contexts/EditEmployeeContext/EditEmployeeContext.tsx";
import {useDeleteProfileImageMutation, usePatchUserVisibilityMutation} from "../../../../api/methods/userApi.ts";

interface Props {
    employee: IUser;
}

export const EmployeeActions: FC<Props> = ({ employee }) => {
    const { handleFileChange, isLoading } = useUploadImage(employee);
    const { notify } = useNotification();
    const [deleteProfileImage, { isLoading: deleteImageIsLoading }] = useDeleteProfileImageMutation();
    const [changeUserVisibility, { isLoading: changeVisibilityIsLoading }] = usePatchUserVisibilityMutation();
    const { openModal } = useEditEmployee();

    const handleDeleteImageClick = async (event: React.MouseEvent) => {
        event.stopPropagation();

        try {
            const response = await deleteProfileImage({ id_user: employee.id_user }).unwrap();
            if (response.status === "success") {
                notify({ title: "Удаление фото", message: "Фото успешно удалено" });
            } else {
                notify({ title: "Ошибка", message: response.message || "Ошибка удаления фото" });
            }
        } catch (error) {
            console.error("Ошибка при удалении фото:", error);
            notify({ title: "Ошибка", message: "Неизвестная ошибка" });
        }
    };

    const handleChangeVisibilityClick = async (event: React.MouseEvent) => {
        event.stopPropagation();

        try {
            const response = await changeUserVisibility({ id_user: employee.id_user }).unwrap();
            if (response.status === "success") {
                notify({ message: "Видимость сотрудника изменена" });
            } else {
                notify({ title: "Ошибка", message: response.message || "Ошибка изменения видимости" });
            }
        } catch (error) {
            console.error("Ошибка изменения видимости:", error);
            notify({ title: "Ошибка", message: "Неизвестная ошибка" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="employee-actions"
        >
            <button
                className="employee-action"
                onClick={handleChangeVisibilityClick}
                disabled={changeVisibilityIsLoading}
            >
                {changeVisibilityIsLoading && <span className="shimmer"></span>}
                {employee.is_hidden ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
            </button>
            <button className="employee-action" onClick={() => openModal(employee)}>
                <ModeEditOutlineOutlinedIcon />
            </button>
            <label className="employee-action">
                <PortraitOutlinedIcon />
                {isLoading && <span className="shimmer"></span>}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden-input"
                    onChange={handleFileChange}
                    disabled={isLoading}
                />
            </label>
            {employee.image.path !== "default.webp" && (
                <button
                    className="employee-action"
                    onClick={handleDeleteImageClick}
                    disabled={deleteImageIsLoading}
                >
                    {deleteImageIsLoading && <span className="shimmer"></span>}
                    <DeleteForeverOutlinedIcon />
                </button>
            )}

        </motion.div>
    );
};
