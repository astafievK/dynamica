import { useCallback } from "react";

export const useRippleEffect = () => {
    return useCallback((event: React.MouseEvent<HTMLElement>) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();

        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.classList.add("ripple");
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        target.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }, []);
};
