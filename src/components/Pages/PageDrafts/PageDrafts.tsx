import "./PageDrafts.css";
import { Tabs } from "./Tabs/Tabs.tsx";
import { pageAnimation } from "../../../constants/pageAnimation.ts";
import { useNavigate } from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {
    useGetDocumentByIdQuery,
    useGetDocumentsTabsByAuthorQuery,
    useUpdateDocumentFieldMutation,
} from "../../../api/methods/documentApi.ts";
import {useAppDispatch, useTypedSelector} from "../../../store/hooks/redux.ts";
import {DraftFieldsGeneral} from "./DraftFields/DraftFieldsGeneral/DraftFieldsGeneral.tsx";
import {useDocumentDraftActions} from "../../../store/hooks/useDocumentDraftActions.ts";
import {setActiveDraft} from "../../../api/slices/draftSlice.ts";
import Button from "../../CustomDefaultComponents/Button/Button.tsx";
import {handleDeleteDraft} from "./utils/handleDeleteDraft.ts";
import {LoadingCircle} from "../../LoadingCircle/LoadingCircle.tsx";
import { DraftFieldsComment } from "./DraftFields/DraftFieldsComment/DraftFieldsComment.tsx";

export const PageDrafts: FC = () => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [removingIds, setRemovingIds] = useState<number[]>([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {user} = useTypedSelector((state) => state.auth);
    const {deleteDocumentAndSelectNext, isDeleting, createDocument, isCreating, createDocumentAndSelect} = useDocumentDraftActions();

    useEffect(() => {
        if (!user) {
            navigate("/", {replace: true});
        }
    }, [user, navigate]);

    const activeDraftId = useSelector((state: RootState) => state.draftReducer.activeDraftId);
    const {data: dataTabs, isLoading: tabsIsLoading, isFetching: tabsIsFetching, isSuccess: tabsLoaded} = useGetDocumentsTabsByAuthorQuery(
        {id_author: user?.id_user as number},
        {skip: !user, pollingInterval: 300000},
    );

    useEffect(() => {
        if (tabsLoaded) {
            if (activeDraftId === null && dataTabs?.tabs.length === 0 && !isCreating) {
                createDocument().catch((error) => {
                    console.error("Ошибка при создании документа:", error);
                });
            }

            if (activeDraftId === null && dataTabs?.tabs.length > 0) {
                dispatch(setActiveDraft(dataTabs.tabs[0].id_document));
            }
        }
    }, [tabsLoaded, activeDraftId, dataTabs, createDocument, dispatch]);

    const [updateDocumentField] = useUpdateDocumentFieldMutation();

    const {data, isLoading: isDocumentLoading, isFetching: isDocumentFetching} = useGetDocumentByIdQuery(
        {id_document: activeDraftId as number},
        {skip: (!tabsLoaded || activeDraftId === null || dataTabs?.tabs.length === 0), pollingInterval: 300000}
    );

    const [documentTitle, setDocumentTitle] = useState('');

    useEffect(() => {
        if (dataTabs && dataTabs.tabs && dataTabs.tabs.length > 0 && activeDraftId === null) {
            dispatch(setActiveDraft(dataTabs.tabs[0].id_document))
        }
    })

    useEffect(() => {
        if (data && data.document.title) {
            setDocumentTitle(data.document.title)
        }
    }, [activeDraftId]);

    useEffect(() => {
        if (data?.document?.title) {
            setDocumentTitle(data.document.title);
        }
    }, [data?.document?.title]);

    useEffect(() => {
        if (!activeDraftId || documentTitle === data?.document?.title || !isEditingTitle) return;

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
                })
                .finally(() => {
                    setIsEditingTitle(false); // сбрасываем флаг после успешного (или неуспешного) запроса
                });
        }, 300);

        return () => clearTimeout(timeout);
    }, [documentTitle, activeDraftId, isEditingTitle]);

    if (!user) return null;

    return (
        <motion.div {...pageAnimation} className="page page-drafts">
            <div className="page-content">
                <div className="page-content-item tabs">
                    <div className="tabs-container">
                        <Tabs
                            tabs={dataTabs?.tabs || []}
                            removingIds={removingIds}
                            setRemovingIds={setRemovingIds}
                            isLoading={tabsIsLoading}
                            isFetching={tabsIsFetching}
                        />
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
                                    autoComplete={"off"}
                                    onChange={(e) => {
                                        setDocumentTitle(e.target.value);
                                        setIsEditingTitle(true);
                                    }}
                                />
                            </div>
                        )
                    }
                </div>

                {
                    (dataTabs && dataTabs.tabs.length > 0) && (
                        <div className="page-content-item document">
                            {
                                data && data.document && activeDraftId && (
                                    <motion.div {...pageAnimation} className="create-document">
                                        <div className="create-document__data">
                                            <DraftFieldsGeneral
                                                className="create-document-item create-document__general"
                                                document={data.document}
                                                activeDraftId={activeDraftId}
                                            />
                                            <DraftFieldsComment
                                                className="create-document-item create-document__comment"
                                                activeDraftId={activeDraftId}
                                            />
                                        </div>
                                        <div className="create-document__actions">
                                            <Button variant={"action"}>
                                                На согласование
                                            </Button>
                                            {
                                                dataTabs.tabs.length > 1 && (
                                                    <Button
                                                        variant={"error"}
                                                        onClick={() => handleDeleteDraft(
                                                            activeDraftId,
                                                            setRemovingIds,
                                                            dataTabs?.tabs || [],
                                                            activeDraftId,
                                                            deleteDocumentAndSelectNext
                                                        )}
                                                        isLoading={isDeleting}
                                                        isDisabled={dataTabs && dataTabs.tabs && dataTabs.tabs.length === 1}
                                                    >
                                                        Удалить черновик
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </motion.div>
                                )
                            }
                        </div>
                    )
                }
                {
                    (dataTabs && dataTabs.tabs.length === 0) && (
                        <div className="page-content-item">
                            <div className="no-documents-screen">
                                <div className="no-documents-screen__info">
                                    <span className="no-documents-screen__info-label">Нет черновиков</span>
                                    <Button
                                        variant={"action"}
                                        onClick={createDocumentAndSelect}
                                        isLoading={isCreating}
                                    >
                                        Создать
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }

                <AnimatePresence>
                    {
                        (isDocumentLoading || isDocumentFetching) && (
                            <motion.div
                                {...pageAnimation}
                                className="document-loading-screen">
                                <LoadingCircle size={70} color={"white"}/>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </motion.div>
    );
}