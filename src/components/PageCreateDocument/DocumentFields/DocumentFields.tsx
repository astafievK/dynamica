import {ChangeEvent, FC, useEffect, useMemo, useRef, useState} from "react";
import {Dropdown} from "../../Dropdown/Dropdown.tsx";
import {useGetCitiesQuery} from "../../../api/methods/cityApi.ts"
import {useGetOrganizationsQuery} from "../../../api/methods/organizationApi.ts";
import {useDocumentFieldUpdater} from "../utils/useDocumentFieldUpdater.ts";
import { IDocument } from "../../../interfaces/IDocument.ts";
import "./DocumentFields.css";
import {useGetDocumentServiceTypesQuery} from "../../../api/methods/documentServiceTypeApi.ts";
import {useGetPartnersQuery} from "../../../api/methods/partnerApi.ts";

interface IDocumentFields {
    document: IDocument;
    activeDraftId: number
}

export const DocumentFields: FC<IDocumentFields> = ({ document, activeDraftId }) => {
    const { data: dataCities } = useGetCitiesQuery();
    const { data: dataOrganizations } = useGetOrganizationsQuery();
    const { data: dataServiceTypes } = useGetDocumentServiceTypesQuery();
    const { data: dataPartners } = useGetPartnersQuery();
    const { handleFieldChange } = useDocumentFieldUpdater();
    const [localCity, setLocalCity] = useState<{ id: number; title: string } | null>(null);
    const [localOrganization, setLocalOrganization] = useState<{ id: number; title: string } | null>(null);
    const [localServiceType, setLocalServiceType] = useState<{ id: number; title: string } | null>(null);
    const [localPartner, setLocalPartner] = useState<{ id: number; title: string } | null>(null);
    const [localComment, setLocalComment] = useState<string>("");

    const textareaCommentRef = useRef<HTMLTextAreaElement>(null);

    const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setLocalComment(e.target.value);

        setInterval(() => {
            handleFieldChange('comment', localComment.trim(), activeDraftId)
        }, 500)
    };

    useEffect(() => {
        if (document?.city) {
            setLocalCity({
                id: document.city.id_city,
                title: document.city.title,
            });
        } else {
            setLocalCity(null);
        }
    }, [document?.city]);

    useEffect(() => {
        if (document?.organization) {
            setLocalOrganization({
                id: document.organization.id_organization,
                title: document.organization.title,
            });
        } else {
            setLocalOrganization(null);
        }
    }, [document?.organization]);

    useEffect(() => {
        if (document?.document_service_type) {
            setLocalServiceType({
                id: document.document_service_type.id_document_service_type,
                title: document.document_service_type.title,
            });
        } else {
            setLocalServiceType(null);
        }
    }, [document?.document_service_type]);

    useEffect(() => {
        if (document?.partner) {
            setLocalPartner({
                id: document.partner.id_partner,
                title: document.partner.title,
            });
        } else {
            setLocalPartner(null);
        }
    }, [document?.partner]);

    const cityOptions = useMemo(
        () =>
            dataCities?.cities?.map((city) => ({
                id: city.id_city,
                title: city.title,
            })) ?? [],
        [dataCities]
    );

    const organizationOptions = useMemo(
        () =>
            dataOrganizations?.organizations?.map((org) => ({
                id: org.id_organization,
                title: org.title,
            })) ?? [],
        [dataOrganizations]
    );

    const serviceTypeOptions = useMemo(
        () =>
            dataServiceTypes?.types?.map((type) => ({
                id: type.id_document_service_type,
                title: type.title,
            })) ?? [],
        [dataServiceTypes]
    );

    const partnerOptions = useMemo(
        () =>
            dataPartners?.partners?.map((partner) => ({
                id: partner.id_partner,
                title: partner.title,
            })) ?? [],
        [dataPartners]
    );

    return (
        <>
            <Dropdown
                options={cityOptions}
                label="Город расположение ДЦ"
                value={localCity}
                onSelect={(option) => {
                    if (activeDraftId) {
                        handleFieldChange("id_city", option.id, activeDraftId);
                        setLocalCity(option);
                    }
                }}
            />
            <Dropdown
                options={organizationOptions}
                label="Юр. лицо ГК"
                value={localOrganization}
                onSelect={(option) => {
                    if (activeDraftId) {
                        handleFieldChange("id_organization", option.id, activeDraftId);
                        setLocalOrganization(option);
                    }
                }}
            />
            <Dropdown
                options={serviceTypeOptions}
                label="Вид услуги"
                value={localServiceType}
                onSelect={(option) => {
                    if (activeDraftId) {
                        handleFieldChange("id_service_type", option.id, activeDraftId);
                        setLocalServiceType(option);
                    }
                }}
            />
            <Dropdown
                options={partnerOptions}
                label="Контрагент"
                value={localPartner}
                onSelect={(option) => {
                    if (activeDraftId) {
                        handleFieldChange("id_partner", option.id, activeDraftId);
                        setLocalPartner(option);
                    }
                }}
            />
            <textarea
                className={"styled"}
                placeholder={"Комментарий"}
                id={"draftCommentTextarea"}
                name={"draft_comment"}
                ref={textareaCommentRef}
                onChange={handleCommentChange}
            >
                {localComment}
            </textarea>
        </>
    );
};