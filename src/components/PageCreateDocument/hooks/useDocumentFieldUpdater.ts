import { useUpdateDocumentFieldMutation } from "../../../api/methods/documentApi.ts";
import {useCallback} from "react";

export const useDocumentFieldUpdater = () => {
    const [updateDocumentField] = useUpdateDocumentFieldMutation();

    const handleFieldChange = useCallback(<T extends number | string>(
        field: string,
        value: T,
        id_document: number,
    ) => {
        updateDocumentField({ id_document, field, value }).unwrap()
            .then(res => {
                if (res.status !== "success") {
                    console.error(`Ошибка при обновлении поля "${field}":`, res.message);
                }
            })
            .catch(err => console.error(`Ошибка при обновлении поля "${field}":`, err))
    }, []);

    return { handleFieldChange };
};