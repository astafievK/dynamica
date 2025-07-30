import React from "react";
import classNames from "classnames";
import "./DraftFile.css";
import { CustomCheckbox } from "../../../../../../CustomDefaultComponents/CustomCheckbox/CustomCheckbox.tsx";
import {CustomMenu} from "../../../../../../CustomDefaultComponents/CustomMenu/CustomMenu.tsx";
import {CustomMenuItem} from "../../../../../../CustomDefaultComponents/CustomMenu/CustomMenuItem/CustomMenuItem.tsx";

interface IDocumentFileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    idFile?: number;
    title: string;
    selectedToDelete: boolean;
    isSelecting: boolean;
    deleteCheckboxOnChange?: () => void;
}

const documentsIcons: Record<string, string> = {
    docx: "word_icon.svg",
    doc: "word_icon.svg",
    pdf: "pdf_icon.svg"
};

export const DocumentFile: React.FC<IDocumentFileProps> = ({
                                                               idFile,
                                                               title,
                                                               selectedToDelete,
                                                               isSelecting,
                                                               deleteCheckboxOnChange,
                                                               ...rest
                                                           }) => {
    const extension = title.substring(title.lastIndexOf(".") + 1).toLowerCase();
    const iconSrc = documentsIcons[extension] || "default_icon.svg";

    const documentFileClasses = classNames({
        'document-file': true,
        'document-file--dimmed': (isSelecting && !selectedToDelete),
        'document-file--selected-to-delete': selectedToDelete,
    });

    return (
        <div className={documentFileClasses}>
            <div className="document-file__checkbox-wrapper" onClick={(e) => e.stopPropagation()}>
                <CustomCheckbox
                    checked={selectedToDelete}
                    onChange={deleteCheckboxOnChange!}
                />
            </div>

            <button className="document-file__content" {...rest}>
                <div className="document-file__icon">
                    <img src={`/documents_icons/${iconSrc}`} alt={title} />
                </div>
                <span className="document-file__title">{title}</span>
            </button>

            <CustomMenu>
                <CustomMenuItem onClick={() => console.log(`Посмотреть документ ID: ${idFile}`)}>
                    Посмотреть
                </CustomMenuItem>
                <CustomMenuItem onClick={() => console.log(`Скачать документ ID: ${idFile}`)}>
                    Скачать
                </CustomMenuItem>
                <CustomMenuItem onClick={() => console.log(`Удалить документ ID: ${idFile}`)}>
                    Удалить
                </CustomMenuItem>
            </CustomMenu>
        </div>
    );
};
