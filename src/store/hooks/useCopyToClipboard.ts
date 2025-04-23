import { useState } from "react";

export function useCopyToClipboard() {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // сбрасываем через 2 секунды
        } catch (error) {
            console.error("Ошибка копирования в буфер обмена:", error);
            setIsCopied(false);
        }
    };

    return { copy, isCopied };
}