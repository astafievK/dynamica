import {FC, useState} from "react";
import { pageAnimation } from "../../constants/pageAnimation.ts";
import { motion } from "framer-motion";
import {FilterButtons} from "../FilterButtons/FilterButtons.tsx";
import {DocumentTile} from "./DocumentTile/DocumentTile.tsx";

const documentsStatuses = [
    "Новые",
    "На редактирование",
    "Отклоненные",
    "Архив",
];

export const PageDocuments: FC = () => {
    const [documentStatus, setDocumentStatus] = useState<string>("");

    return (
        <motion.div {...pageAnimation} className="page page-documents">
            <div className="page-content">
                <div className="documents-container page-content-item">
                    <div className="documents-filter">
                        <FilterButtons
                            filter={documentStatus}
                            setFilter={setDocumentStatus}
                            data={documentsStatuses}
                            renderLabel={(item) => item}
                        />
                    </div>
                    <div className="documents">
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="На согласовании"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="На редактировании"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="Отклонено"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="В архиве"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="На согласовании"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="На редактировании"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="Отклонено"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="В архиве"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="Отклонено"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="В архиве"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="Отклонено"
                        />
                        <DocumentTile
                            id={1}
                            dateCreated="19.04.2025"
                            dateExpires="01.01.2026"
                            title="Договор поставки ООО 'Тестовая организация'"
                            entity="ООО 'Рога и Копыта'"
                            counterparty="ООО 'Партнёр'"
                            serviceType="Регулярная услуга"
                            status="В архиве"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
