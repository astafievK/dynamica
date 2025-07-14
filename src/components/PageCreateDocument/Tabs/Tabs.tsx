import React, {useState} from "react";
import { Tab } from "./Tab/Tab";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useDispatch, useSelector } from "react-redux";
import { setActiveDraft } from "../../../api/slices/draftSlice";
import { RootState } from "../../../store/store";
import { useTypedSelector } from "../../../store/hooks/redux.ts";
import "./Tabs.css";
import { useDocumentDraftActions } from "../../../store/hooks/useDocumentDraftActions.ts";
import { IDocumentTab } from "../../../interfaces/IDocumentTab.ts";

interface ITabsProps {
    tabs: IDocumentTab[];
}

export const Tabs: React.FC<ITabsProps> = ({ tabs }) => {
    const [removingIds, setRemovingIds] = useState<number[]>([]);
    const activeDraftId = useSelector((state: RootState) => state.draftReducer.activeDraftId);
    const dispatch = useDispatch();
    const { user } = useTypedSelector((state) => state.auth);

    const { createDocument, deleteDocumentAndSelectNext, isCreating } = useDocumentDraftActions();

    const handleAddClick = async () => {
        if (isCreating) return;

        await createDocument();
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
        <div className="tabs">
            <button
                className="add-tab tabs-item"
                onClick={handleAddClick}
                title="Создать документ"
                disabled={!user || isCreating}
            >
                <AddRoundedIcon />
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
