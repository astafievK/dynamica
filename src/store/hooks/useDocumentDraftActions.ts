import {
    useCreateNewDocumentMutation,
    useDeleteDocumentMutation
} from "../../api/methods/documentApi.ts";
import { setActiveDraft } from "../../api/slices/draftSlice.ts";
import { useAppDispatch, useTypedSelector } from "./redux.ts";
import {IDraftTab} from "../../interfaces/IDraftTab.ts";

export const useDocumentDraftActions = () => {
    const [createDocMutation, { isLoading: isCreating }] = useCreateNewDocumentMutation();
    const [deleteDocMutation, { isLoading: isDeleting }] = useDeleteDocumentMutation();
    const { user } = useTypedSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const createDocument = async () => {
        if (!user) {
            console.warn("Попытка создать документ без авторизации");
            return;
        }

        try {
            const response = await createDocMutation({ id_author: user.id_user }).unwrap();
            if (response.status === "success" && response.id_document) {
                return response.id_document;
            } else {
                console.error("Ошибка при создании документа:", response.message);
            }
        } catch (error) {
            console.error("Ошибка при создании документа:", error);
        }
    };

    const deleteDocument = async (id_document: number) => {
        if (!user) {
            console.warn("Попытка удалить документ без авторизации");
            return;
        }

        try {
            const response = await deleteDocMutation({ id_document }).unwrap();
            if (response.status !== "success") {
                console.error("Ошибка при удалении документа:", response.message);
            }
        } catch (error) {
            console.error("Ошибка при удалении документа:", error);
        }
    };

    const deleteDocumentAndSelectNext = async (
        idToDelete: number,
        tabs: IDraftTab[],
        activeDraftId: number | null
    ) => {
        const isCurrentTab = activeDraftId === idToDelete;

        await deleteDocument(idToDelete);

        if (!isCurrentTab) return;

        const remainingTabs = tabs.filter(tab => tab.id_document !== idToDelete);

        if (remainingTabs.length === 0) {
            dispatch(setActiveDraft(null));
            return;
        }

        const deletedIndex = tabs.findIndex(tab => tab.id_document === idToDelete);

        const isFirst = deletedIndex === 0;
        const isLast = deletedIndex === tabs.length - 1;

        if (isFirst && remainingTabs.length >= 1) {
            dispatch(setActiveDraft(remainingTabs[0].id_document));
        } else if (isLast && remainingTabs.length >= 1) {
            dispatch(setActiveDraft(remainingTabs[remainingTabs.length - 1].id_document));
        } else if (!isFirst && !isLast && remainingTabs.length > deletedIndex) {
            dispatch(setActiveDraft(remainingTabs[deletedIndex].id_document));
        } else {
            dispatch(setActiveDraft(remainingTabs[0].id_document));
        }
    };

    const createDocumentAndSelect = async () => {
        const newDraftId = await createDocument();
        if (newDraftId) {
            dispatch(setActiveDraft(newDraftId));
        }
    }

    return {
        createDocument,
        deleteDocument,
        deleteDocumentAndSelectNext,
        createDocumentAndSelect,
        isCreating,
        isDeleting,
    };
};