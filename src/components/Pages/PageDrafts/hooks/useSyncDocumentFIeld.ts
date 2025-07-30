import {useEffect, useState} from "react";

export const useSyncDocumentField = (docField: any, idKey: string, titleKey: string) => {
    const [localValue, setLocalValue] = useState<{ id: number; title: string } | null>(null);

    useEffect(() => {
        if (docField) {
            setLocalValue({ id: docField[idKey], title: docField[titleKey] });
        } else {
            setLocalValue(null);
        }
    }, [docField, idKey, titleKey]);

    return [localValue, setLocalValue] as const;
};
