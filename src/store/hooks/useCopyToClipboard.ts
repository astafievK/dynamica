import { useState } from "react";

export const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setCopyError(false);
            setTimeout(() => setCopied(false), 1000);
        } catch (err) {
            console.error("Ошибка копирования:", err);
            setCopyError(true);
            setCopied(false);
            setTimeout(() => setCopyError(false), 1500);
        }
    };

    return { copied, copyError, copyToClipboard };
};
