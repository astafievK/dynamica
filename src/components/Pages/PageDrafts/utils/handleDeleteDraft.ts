import {IDraftTab} from "../../../../interfaces/IDraftTab.ts";
import React from "react";

export const handleDeleteDraft = async (
    idToDelete: number,
    setRemovingIds: React.Dispatch<React.SetStateAction<number[]>>,
    tabs: IDraftTab[],
    activeDraftId: number,
    deleteDocumentAndSelectNext: (idToDelete: number, tabs: IDraftTab[], activeDraftId: number) => Promise<void>
) => {
    setRemovingIds(prev => [...prev, idToDelete]);

    await deleteDocumentAndSelectNext(idToDelete, tabs, activeDraftId);

    setRemovingIds(prev => prev.filter(id => id !== idToDelete));
};