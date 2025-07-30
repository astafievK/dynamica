import "./DraftFilesList.css";
import React, { useState } from "react";
import { FilterButtons } from "../../../../../FilterButtons/FilterButtons.tsx";
import { DocumentFile } from "./DraftFile/DraftFile.tsx";
import UploadFileButton from "../../../../../CustomDefaultComponents/UploadFileButton/UploadFileButton.tsx";

const filterOptions = [
    "Все",
    "Документы (.doc .docx .pdf)",
    "Изображения"
]

const files = [
    { id: 1, title: "Тестовый документ 1.pdf" },
    { id: 2, title: "Тестовый документ 2.pdf" },
    { id: 3, title: "Тестовый документ 3.docx" },
    { id: 4, title: "Тестовый документ 4.pdf" },
    { id: 5, title: "Тестовый документ 5.pdf" },
    { id: 6, title: "Тестовый документ 6.pdf" },
    { id: 7, title: "Тестовый документ 7.pdf" },
    { id: 8, title: "Тестовый документ 8.pdf" },
    { id: 9, title: "Тестовый документ 9.pdf" },
    { id: 10, title: "Тестовый документ 10.pdf" }
];

export const DraftFilesList: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>(filterOptions[0]);
    const [documentsToDelete, setDocumentsToDelete] = useState<number[]>([]);

    const toggleFileToDelete = (id: number) => {
        setDocumentsToDelete((prev) =>
            prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]
        );
    };

    return (
        <div className="document-files">
            <div className="document-files__header">
                <FilterButtons
                    filter={selectedOption}
                    setFilter={setSelectedOption}
                    data={filterOptions}
                    renderLabel={(item) => item}
                />
            </div>
            <div className="document-files__body">
                <div className="files-list">
                    {files.map((file) => (
                        <DocumentFile
                            key={file.id}
                            idFile={file.id}
                            title={file.title}
                            isSelecting={documentsToDelete.length > 0}
                            selectedToDelete={documentsToDelete.includes(file.id)}
                            deleteCheckboxOnChange={() => toggleFileToDelete(file.id)}
                        />
                    ))}
                </div>
            </div>
            <div className="document-files__footer">
                <UploadFileButton label={"Загрузить документы"} id={"draftUploadFilesButton"} variant={"outlined"}/>
            </div>
        </div>
    );
}