import {FC, InputHTMLAttributes} from "react";
import "./UploadFileButton.css"

interface IUploadFileButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    variant?: "action" | "secondary" | "outlined" | "error"
    isLoading?: boolean;
    isDisabled?: boolean;
}

const UploadFileButton: FC<IUploadFileButtonProps> = ({
    label,
    variant,
    className,
    isLoading = false,
    isDisabled,
    ...rest
    }) => (
    <div className={`upload-file-wrapper ${className}`}>
        <label htmlFor={rest.id} className={`upload-label ${variant && variant}`} aria-disabled={isDisabled}>
            {isLoading && <div className="shimmer"></div>}
            {label}
        </label>
        <input type={"file"} {...rest}/>
    </div>
)

export default UploadFileButton;