import React from "react";
import { Tab } from "./Tab/Tab";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {useDispatch, useSelector} from "react-redux";
import { setActiveDraft } from "../../../api/slices/draftSlice";
import { RootState } from "../../../store/store";
import {
    useCreateNewDocumentMutation,
    useDeleteDocumentMutation,
    useGetDocumentsTabsByAuthorQuery
} from "../../../api/methods/documentApi.ts";
import {useTypedSelector} from "../../../store/hooks/redux.ts";

export const Tabs: React.FC = () => {
    const activeDraftId = useSelector((state: RootState) => state.draftReducer.activeDraftId);
    const dispatch = useDispatch();
    const { user } = useTypedSelector((state) => state.auth);

    // Если user нет — не делать запрос и не рендерить вкладки
    const { data, isLoading, isError } = useGetDocumentsTabsByAuthorQuery(
        { id_author: user ? user.id_user : 0 },
        { skip: !user }
    );

    // Создание/удаление документа тоже зависит от user
    const [createDocument] = useCreateNewDocumentMutation();
    const [deleteDocument] = useDeleteDocumentMutation();

    const handleAddClick = async () => {
        if (!user) return; // Защита
        try {
            const response = await createDocument({ id_author: user.id_user }).unwrap();
            if (response.status === "success" && response.id_document) {
                dispatch(setActiveDraft(response.id_document));
            } else {
                console.error("Ошибка при создании документа:", response.message);
            }
        } catch (error) {
            console.error("Ошибка при создании документа:", error);
        }
    };

    const handleTabClick = (id: number) => {
        if (!user) return; // Защита
        dispatch(setActiveDraft(id));
    };

    const handleTabClose = async (id_document: number) => {
        if (!user) return; // Защита
        try {
            const response = await deleteDocument({ id_document }).unwrap();
            if (response.status === "success" && response.id_document) {
                console.log("удалено")
            } else {
                console.error("Ошибка при удалении документа:", response.message);
            }
        } catch (error) {
            console.error("Ошибка при создании документа:", error);
        }
    };

    if (!user) return <div>Пользователь не авторизован</div>; // или null, или редирект

    if (isLoading) return <div>Загрузка...</div>;
    if (isError || !data) return <div>Ошибка при загрузке вкладок</div>;

    return (
        <div className="tabs">
            <button className="add-tab tabs-item" onClick={handleAddClick} title={"Создать документ"}>
                <AddRoundedIcon />
            </button>
            {data.tabs.map((document) => (
                <Tab
                    key={document.id_document}
                    id={document.id_document}
                    title={document.title}
                    isActive={document.id_document === activeDraftId}
                    onClick={() => handleTabClick(document.id_document)}
                    onClose={() => handleTabClose(document.id_document)}
                    tabsCount={data.tabs.length}
                />
            ))}
        </div>
    );
};

