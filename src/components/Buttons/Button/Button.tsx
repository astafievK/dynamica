import {ButtonHTMLAttributes, FC} from "react";
import "./Button.css"
import classNames from "classnames";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "action" | "secondary" | "outlined" | "error"
    isLoading?: boolean;
    isDisabled?: boolean;
}

const Button: FC<IButtonProps> = ({
        children,
        variant,
        isLoading = false,
        isDisabled,
        className,
        ...rest
    }) => (
    <button
        className={classNames("custom-button", variant, className)}
        disabled={isDisabled || isLoading}
        {...rest}
    >
        {children}
        {isLoading && <div className="shimmer"></div>}
    </button>
)

export default Button;