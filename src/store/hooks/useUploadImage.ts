import { useState } from "react";
import {useUploadProfileImageMutation} from "../../api/methods/userApi.ts";
import {Employee} from "../../interfaces/IEmployee.ts";

export const useUploadImage = (employee: Employee) => {
    const [uploadProfileImage, { isLoading }] = useUploadProfileImageMutation();
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
                console.log(error);
            }
        }
    };

    return { handleFileChange, isLoading, notification, setNotification };
};
