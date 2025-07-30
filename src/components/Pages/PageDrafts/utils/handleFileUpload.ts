import { ChangeEvent } from "react";

type UploadFileParams = {
    id_document: number;
    path: string;
    file: File;
};

type UploadFileFunction = (params: UploadFileParams) => Promise<{ status: string; message: string; path?: string }>;

export const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    activeDraftId: number,
    uploadFile: UploadFileFunction
) => {
    if (!e.target.files || !e.target.files[0] || !activeDraftId) return;

    const file = e.target.files[0];
    const basePath = file.name;

    try {
        const res = await uploadFile({
            id_document: activeDraftId,
            path: basePath,
            file: file
        });

        if (res.status !== "success") {
            console.error("Ошибка загрузки файла:", res.message);
        }
    } catch (err) {
        console.error("Ошибка загрузки файла:", err);
    }
};
