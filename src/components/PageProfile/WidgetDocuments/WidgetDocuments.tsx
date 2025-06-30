import React, { FC, useMemo, useState } from "react";
import { DocumentCard } from "./DocumentCard/DocumentCard";
import documents from "../../../jsons/documents.json";
import {WidgetTemplate} from "../../Widgets/WidgetTemplate/WidgetTemplate.tsx";
import "./WidgetDocuments.css"

const documentStatuses = [
    { id: 0, title: "Все" },
    { id: 1, title: "На согласовании" },
    { id: 2, title: "На редактировании" },
    { id: 3, title: "Отклонено" },
    { id: 4, title: "В архиве" },
];

const documentTypes = [
    { id: 0, title: "Все" },
    { id: 1, title: "Регулярная услуга" },
    { id: 2, title: "Разовая услуга" },
];

export const WidgetDocuments: FC = React.memo(() => {
    const [selectedStatus, setSelectedStatus] = useState(documentStatuses[0]);
    const [selectedType, setSelectedType] = useState(documentTypes[0]);

    const filteredDocuments = useMemo(() => {
        return documents.filter((doc) => {
            const statusMatch = selectedStatus.title === "Все" || doc.status === selectedStatus.title;
            const typeMatch = selectedType.title === "Все" || doc.type === selectedType.title;
            return statusMatch && typeMatch;
        });
    }, [selectedStatus, selectedType]);

    return (
        <WidgetTemplate
            title="Договора"
            linkTo="/documents"
            data={documents}
            filteredItems={filteredDocuments}
            filters={[
                {
                    label: "Вид услуги",
                    options: documentTypes,
                    selected: selectedType,
                    onChange: setSelectedType,
                },
                {
                    label: "Статус",
                    options: documentStatuses,
                    selected: selectedStatus,
                    onChange: setSelectedStatus,
                },
            ]}
            renderItem={(document) => (
                <DocumentCard
                    key={document.id_document}
                    id={document.id_document}
                    title={document.title}
                    status={document.status}
                    signedDate={document.signedDate}
                    expiresDate={document.expiresDate}
                    type={document.type}
                    partner={document.partner}
                    entity={document.entity}
                    variety={document.variety}
                />
            )}
            emptyMessage="Документы не найдены"
            gridClass="documents-grid"
            widgetClass="widget-documents"
            queryLimit={10}
        />
    );
});
