import { useState, useEffect } from "react";

export const useModal = (isOpen: boolean, setIsOpenState: (isOpen: boolean) => void) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpenState(false);
            setIsClosing(false);
        }, 400); // время, которое нужно для анимации закрытия
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    return {
        isClosing,
        handleClose
    };
};
