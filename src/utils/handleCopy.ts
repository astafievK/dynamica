import { MouseEvent } from "react";

export const handleCopyUtil = async (
    event: MouseEvent,
    text: string,
    target: string,
    copyFn: (text: string) => Promise<void>,
    notifyFn: (params: { title?: string; message: string }) => void
) => {
    event.stopPropagation();

    try {
        await copyFn(text);
        notifyFn({ title: target, message: "Скопировано" });
    } catch (error) {
        console.error("Ошибка при копировании:", error);
        notifyFn({ title: target, message: "Ошибка копирования" });
    }
};
