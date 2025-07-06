import "./PageCreateDocument.css";
import { Tabs } from "./Tabs/Tabs.tsx";
import { pageAnimation } from "../../constants/motionSettings.ts";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {FC, useEffect, useState} from "react";
import DocxViewer from "../DocxViewer/DocxViewer.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {
    useGetDocumentByIdQuery,
    useGetDocumentsTabsByAuthorQuery,
    useUpdateDocumentFieldMutation
} from "../../api/methods/documentApi.ts";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux.ts";
import {DocumentFields} from "./DocumentFields/DocumentFields.tsx";
import {useDocumentDraftActions} from "../../store/hooks/useDocumentDraftActions.ts";
import {setActiveDraft} from "../../api/slices/draftSlice.ts";

export const PageCreateDocument: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useTypedSelector((state) => state.auth);


    useEffect(() => {
        if (!user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    const activeDraftId = useSelector((state: RootState) => state.draftReducer.activeDraftId);
    const { data: dataTabs, isSuccess: tabsLoaded } = useGetDocumentsTabsByAuthorQuery({ id_author: user!.id_user });
    const { createDocument } = useDocumentDraftActions();

    const [hasHandledInitialState, setHasHandledInitialState] = useState(false);

    useEffect(() => {
        if (tabsLoaded && !hasHandledInitialState) {
            setHasHandledInitialState(true);

            // если вообще ничего нет — создаём
            if (activeDraftId === null && dataTabs?.tabs.length === 0) {
                createDocument().catch((error) => {
                    console.error("Ошибка при создании документа:", error);
                });
            }

            // если есть вкладки — ставим первую активной
            if (activeDraftId === null && dataTabs?.tabs.length > 0) {
                dispatch(setActiveDraft(dataTabs.tabs[0].id_document));
            }
        }
    }, [tabsLoaded, activeDraftId, hasHandledInitialState, createDocument, dataTabs, dispatch]);

    const [documentTitle, setDocumentTitle] = useState('');
    const [updateDocumentField] = useUpdateDocumentFieldMutation();

    const { data } = useGetDocumentByIdQuery(
        { id_document: activeDraftId as number },
        { skip: activeDraftId === null }
    );

    useEffect(() => {
        if (data?.document?.title) {
            setDocumentTitle(data.document.title);
        }
    }, [data?.document?.title]);

    useEffect(() => {
        if (!activeDraftId || documentTitle === data?.document?.title) return;

        const timeout = setTimeout(() => {
            updateDocumentField({
                id_document: activeDraftId,
                field: 'title',
                value: documentTitle
            }).unwrap()
                .then(res => {
                    if (res.status !== 'success') {
                        console.error("Ошибка при обновлении названия:", res.message);
                    }
                })
                .catch(err => {
                    console.error("Ошибка при обновлении названия:", err);
                });
        }, 300);

        return () => clearTimeout(timeout);
    }, [documentTitle]);

    return (
        <motion.div {...pageAnimation} className="page page-create-document">
            <div className="page-header">
                <div className="tabs-container">
                    <Tabs tabs={dataTabs?.tabs || []} />
                </div>
                {
                    data && data.document && activeDraftId && (
                        <div className="document-title">
                            <input
                                type="text"
                                className="document-title-input styled"
                                name="document-create-title"
                                placeholder="Название документа"
                                value={documentTitle}
                                onChange={(e) => setDocumentTitle(e.target.value)}
                            />
                        </div>
                    )
                }
            </div>
            <div className="page-content">
                {
                    data && data.document && activeDraftId && (
                        <div className="create-document">
                            <div className="create-document__preview">
                                {
                                    data.document.path && (
                                        <DocxViewer fileUrl={import.meta.env.VITE_BASE_DOCUMENT_URL + encodeURIComponent(data.document.path)}/>
                                    )
                                }

                                <div className="upload-document__container">
                                    <button className="upload-document">
                                        Удалить файл
                                    </button>
                                </div>
                            </div>
                            <div className="create-document__fields">
                                <DocumentFields document={data.document} activeDraftId={activeDraftId}/>
                                {
                                    /*
                                    <div className="task-duration">
                                    <span className="field-title">Сроки подписания</span>
                                    <div className="calendars">
                                        <div className="calendar">
                                            <label htmlFor="createDocumentDurationStart" onClick={openStartDate}>
                                                {fields.startDate || "С"}
                                            </label>
                                            <input
                                                type="date"
                                                id="createDocumentDurationStart"
                                                ref={startInputRef}
                                                value={fields.startDate ?? ""}
                                                onChange={(e) => updateField("startDate", e.target.value)}
                                            />
                                        </div>
                                        <ArrowForwardIosRoundedIcon/>
                                        <div className="calendar">
                                            <label htmlFor="createDocumentDurationFinish" onClick={openEndDate}>
                                                {fields.endDate || "До"}
                                            </label>
                                            <input
                                                type="date"
                                                id="createDocumentDurationFinish"
                                                ref={endInputRef}
                                                value={fields.endDate ?? ""}
                                                onChange={(e) => updateField("endDate", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                     */
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </motion.div>
    );
}
