import { FC, useEffect } from "react";
import { pageAnimation } from "../../motionSettins.ts";
import { motion } from "framer-motion";
import {DocumentRow} from "./DocumentRow/DocumentRow.tsx";

export const PageDocuments: FC = () => {
    useEffect(() => {
        document.title = "Договора";
    });

    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className="page page-documents"
        >
            <div className="page-header">
                <span className="page-title">Договора</span>
            </div>
            <div className="page__actions">
                <div className="page__filters"></div>
                <div className="page__create"></div>
            </div>
            <div className="documents">
                <div className="documents__block documents__block--active">
                    <span className="documents__block-title">Активные</span>
                    <table className="documents__table">
                        <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Срок действия</th>
                                <th>Наименование</th>
                                <th>Юр. лицо Автохолдинга</th>
                                <th>Контрагент</th>
                                <th>Вид услуги</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                        </tbody>
                    </table>
                </div>

                <div className="documents__block documents__block--archive">
                    <span className="documents__block-title">Архив</span>
                    <table className="documents__table">
                        <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Срок действия</th>
                                <th>Наименование</th>
                                <th>Юр. лицо Автохолдинга</th>
                                <th>Контрагент</th>
                                <th>Вид услуги</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                            <DocumentRow
                                id={1}
                                dateCreated={"01.01.2025"}
                                dateExpires={"01.01.2026"}
                                title={"Договор поставки"}
                                entity={"ООО Автохолдинг"}
                                counterparty={"ООО Контрагент"}
                                serviceType={"Поставка"}
                                status={"Активный"}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};
