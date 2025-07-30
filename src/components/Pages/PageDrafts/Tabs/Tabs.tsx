import React from "react";
import { Tab } from "./Tab/Tab.tsx";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useDispatch, useSelector } from "react-redux";
import { setActiveDraft } from "../../../../api/slices/draftSlice.ts";
import { RootState } from "../../../../store/store.ts";
import { useTypedSelector } from "../../../../store/hooks/redux.ts";
import "./Tabs.css";
import { useDocumentDraftActions } from "../../../../store/hooks/useDocumentDraftActions.ts";
import { IDraftTab } from "../../../../interfaces/IDraftTab.ts";
import {LoadingCircle} from "../../../LoadingCircle/LoadingCircle.tsx";

interface ITabsProps {
    tabs: IDraftTab[];
    removingIds: number[];
    setRemovingIds: React.Dispatch<React.SetStateAction<number[]>>
    isFetching: boolean;
    isLoading: boolean;
}

export const Tabs: React.FC<ITabsProps> = ({ tabs, removingIds, setRemovingIds, isLoading, isFetching }) => {
    const activeDraftId = useSelector((state: RootState) => state.draftReducer.activeDraftId);
    const dispatch = useDispatch();
    const { user } = useTypedSelector((state) => state.auth);

    const { deleteDocumentAndSelectNext, isCreating, createDocumentAndSelect } = useDocumentDraftActions();

    const handleAddClick = async () => {
        if (isCreating) return;

        await createDocumentAndSelect();
    };

    const handleTabClick = (id: number) => {
        if (!user) return;
        dispatch(setActiveDraft(id));
    };

    const handleTabClose = async (idToDelete: number) => {
        setRemovingIds(prev => [...prev, idToDelete]);

        await deleteDocumentAndSelectNext(idToDelete, tabs, activeDraftId);

        setRemovingIds(prev => prev.filter(id => id !== idToDelete));
    };

    return (
        <div className="tabs-list">
            <button
                className="add-tab tabs-item"
                onClick={handleAddClick}
                title="Создать черновик"
                disabled={!user || isCreating || isFetching || isLoading}
            >
                {
                    (isCreating || isLoading || isFetching) ?
                        <LoadingCircle size={30} /> :
                        <AddRoundedIcon />
                }
            </button>

            {tabs.map((tab) => (
                <Tab
                    key={tab.id_document}
                    title={tab.title}
                    isActive={tab.id_document === activeDraftId}
                    onClick={() => handleTabClick(tab.id_document)}
                    onClose={() => handleTabClose(tab.id_document)}
                    tabsCount={tabs.length}
                    isRemoving={removingIds.includes(tab.id_document)}
                />
            ))}
        </div>
    );
};
