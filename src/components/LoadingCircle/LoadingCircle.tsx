import { FC } from "react";
import "./LoadingCircle.css"

interface LoadingCircleProps {
    size?: number;
    color?: string;
    className?: string;
}

export const LoadingCircle: FC<LoadingCircleProps> = ({
                                                          size = 40,
                                                          color = "var(--color-primary-700)",
                                                          className = "",
                                                      }) => {
    const style = {
        width: size,
        height: size,
        borderTopColor: color,
        aspectRatio: "1/1",
    };

    return (
        <div
            className={`loading-circle ${className}`}
            style={style}
            role="status"
            aria-label="Загрузка..."
        />
    );
};
