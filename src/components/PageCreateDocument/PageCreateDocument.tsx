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
    useUpdateDocumentFieldMutation
} from "../../api/methods/documentApi.ts";
import {useGetCitiesQuery} from "../../api/methods/cityApi.ts";
import { Dropdown } from "../Dropdown/Dropdown.tsx";
import {useGetOrganizationsQuery} from "../../api/methods/organizationApi.ts";
import {useTypedSelector} from "../../store/hooks/redux.ts";

export const PageCreateDocument: FC = () => {
    const navigate = useNavigate();
    const [localCity, setLocalCity] = useState<{ id: number, title: string } | null>(null);
    const [localOrganization, setLocalOrganization] = useState<{ id: number, title: string } | null>(null);
    const [documentTitle, setDocumentTitle] = useState('');
    const { user } = useTypedSelector((state) => state.auth)

    const activeDraftId = useSelector((state: RootState) => state.draftReducer.activeDraftId);
    const [updateDocumentField, {isLoading: isUpdating}] = useUpdateDocumentFieldMutation();
    const { data } = useGetDocumentByIdQuery(
        { id_document: activeDraftId },
        { skip: activeDraftId === null }
    );
    const {data: dataCities} = useGetCitiesQuery();
    const {data: dataOrganizations} = useGetOrganizationsQuery();


    useEffect(() => {
        if (!user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

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
        }, 750);

        return () => clearTimeout(timeout);
    }, [documentTitle]);


    useEffect(() => {
        if (data?.document?.city) {
            setLocalCity({
                id: data.document.city.id_city,
                title: data.document.city.title
            });
        } else {
            setLocalCity(null);
        }
    }, [data?.document]);

    useEffect(() => {
        if (data?.document?.organization) {
            setLocalOrganization({
                id: data.document.organization.id_organization,
                title: data.document.organization.title
            });
        } else {
            setLocalOrganization(null);
        }
    }, [data?.document]);

    const handleCityChange = async (selected: { id: number; title: string }) => {
        setLocalCity(selected); // показать выбранное сразу

        try {
            const response = await updateDocumentField({
                id_document: activeDraftId,
                field: "id_city",
                value: selected.id
            }).unwrap();

            if (response.status !== "success") {
                console.error("Ошибка при обновлении документа:", response.message);
            }
        } catch (error) {
            console.error("Ошибка при обновлении документа:", error);
        }
    };

    const handleOrganizationChange = async (selected: { id: number; title: string }) => {
        setLocalOrganization(selected); // показать выбранное сразу

        try {
            const response = await updateDocumentField({
                id_document: activeDraftId,
                field: "id_organization",
                value: selected.id
            }).unwrap();

            if (response.status !== "success") {
                console.error("Ошибка при обновлении документа:", response.message);
            }
        } catch (error) {
            console.error("Ошибка при обновлении документа:", error);
        }
    };

    return (
        <motion.div {...pageAnimation} className="page page-create-document">
            <div className="page-header">
                <div className="tabs-container">
                    <Tabs/>
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
                                disabled={isUpdating}
                            />
                        </div>
                    )
                }
            </div>
            <div className="page-content">
                {
                    data && data.document && (
                        <div className="create-document">
                            <div className="create-document__preview">
                                <DocxViewer fileUrl="/test.docx"/>
                                <div className="upload-document__container">
                                    <button className="upload-document">
                                        Удалить файл
                                    </button>
                                </div>
                            </div>
                            <div className="create-document__fields">
                                <Dropdown
                                    options={dataCities?.cities?.map(city => ({
                                        id: city.id_city,
                                        title: city.title
                                    })) ?? []}
                                    label="Город расположение ДЦ"
                                    value={localCity}
                                    onSelect={handleCityChange}
                                    isDisabled={isUpdating}
                                />
                                <Dropdown
                                    options={dataOrganizations?.organizations?.map(organization => ({
                                        id: organization.id_organization,
                                        title: organization.title
                                    })) ?? []}
                                    label="Юр. лицо ГК"
                                    value={localOrganization}
                                    onSelect={handleOrganizationChange}
                                    isDisabled={isUpdating}
                                />
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
