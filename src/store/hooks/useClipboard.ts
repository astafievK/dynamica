import { useState } from "react";

interface ClipboardState {
    visible: boolean;
    x: number;
    y: number;
}

export const useClipboard = (timeout: number = 1500) => {
    const [tooltip, setTooltip] = useState<ClipboardState | null>(null);

    const copyToClipboard = async (text: string, event: React.MouseEvent) => {
        try {
            await navigator.clipboard.writeText(text);

            // Получаем координаты курсора
            const { clientX, clientY } = event;
            setTooltip({ visible: true, x: clientX, y: clientY });

            // Убираем сообщение через timeout
            setTimeout(() => setTooltip(null), timeout);
        } catch (err) {
            console.error("Ошибка при копировании:", err);
        }
    };

    return { copyToClipboard, tooltip };
};
