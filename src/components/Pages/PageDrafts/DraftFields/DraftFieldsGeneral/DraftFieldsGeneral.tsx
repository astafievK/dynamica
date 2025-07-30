import React, {FC, useEffect, useState} from "react";
import {Dropdown} from "../../../../CustomDefaultComponents/Dropdown/Dropdown.tsx";
import {useGetCitiesQuery} from "../../../../../api/methods/cityApi.ts"
import {useGetOrganizationsQuery} from "../../../../../api/methods/organizationApi.ts";
import {useDocumentFieldUpdater} from "../../hooks/useDocumentFieldUpdater.ts";
import { IDocument } from "../../../../../interfaces/IDocument.ts";
import {useGetDocumentServiceTypesQuery} from "../../../../../api/methods/documentServiceTypeApi.ts";
import {useGetPartnersQuery} from "../../../../../api/methods/partnerApi.ts";
import {useGetUsersBySystemTitleQuery} from "../../../../../api/methods/userHasPermissionApi.ts";
import {Permissions} from "../../../../../constants/permissions.ts";
import {useSyncDocumentField} from "../../hooks/useSyncDocumentFIeld.ts";
import "./DraftFieldsGeneral.css";
import "../DraftFields.css"
import {useDropdownOptions} from "../../../../../store/hooks/useDropdownOptions.ts";
import { normalizeUsers } from "../../utils/normalizeUsers.ts";
import {DateRangePicker} from "../../../../CustomDefaultComponents/DateRangePicker/DateRangePicker.tsx";

type DropdownOption = {
    id: number,
    title: string
}

interface ICreateDocumentFieldsGeneralProps extends React.HTMLAttributes<HTMLDivElement> {
    document: IDocument;
    activeDraftId: number;
}

export const DraftFieldsGeneral: FC<ICreateDocumentFieldsGeneralProps> = ({ document, activeDraftId, ...rest }) => {
    const { data: dataCities } = useGetCitiesQuery();
    const { data: dataOrganizations } = useGetOrganizationsQuery();
    const { data: dataServiceTypes } = useGetDocumentServiceTypesQuery();
    const { data: dataPartners } = useGetPartnersQuery();
    const { data: signersSecurity } = useGetUsersBySystemTitleQuery({ system_title: Permissions.ApproverSecurityService })
    const { data: signersCentralMarketing } = useGetUsersBySystemTitleQuery({ system_title: Permissions.ApproverCentralMarketing })
    const { data: signersAccounting } = useGetUsersBySystemTitleQuery({ system_title: Permissions.ApproverAccounting })
    const { data: signersLegal } = useGetUsersBySystemTitleQuery({ system_title: Permissions.ApproverLegal })
    const { handleFieldChange } = useDocumentFieldUpdater();
    const [localCity, setLocalCity] = useSyncDocumentField(document?.city, 'id_city', 'title');
    const [localOrganization, setLocalOrganization] = useSyncDocumentField(document?.organization, 'id_organization', 'title');
    const [localServiceType, setLocalServiceType] = useSyncDocumentField(document?.document_service_type, 'id_document_service_type', 'title');
    const [localPartner, setLocalPartner] = useSyncDocumentField(document?.partner, 'id_partner', 'title');
    const [ signerSecurity, setSignerSecurity ] = useState<{ id: number; title: string } | null>(null);
    const [ signerCentralMarketing, setSignerCentralMarketing ] = useState<{ id: number; title: string } | null>(null);
    const [ signerAccounting, setSignerAccounting ] = useState<{ id: number; title: string } | null>(null);
    const [ signerLegal, setSignerLegal ] = useState<{ id: number; title: string } | null>(null);
    const [documentDateActiveFrom, setDocumentDateActiveFrom] = useState<string | null>(null);
    const [documentDateActiveTo, setDocumentDateActiveTo] = useState<string | null>(null);
    const [documentSigningFrom, setDocumentSigningFrom] = useState<string | null>(null);
    const [documentSigningTo, setDocumentSigningTo] = useState<string | null>(null);

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

    const cityOptions = useDropdownOptions(dataCities?.cities, 'id_city', 'title');
    const organizationOptions = useDropdownOptions(dataOrganizations?.organizations, 'id_organization', 'title');
    const serviceTypeOptions = useDropdownOptions(dataServiceTypes?.types, 'id_document_service_type', 'title');
    const partnerOptions = useDropdownOptions(dataPartners?.partners, 'id_partner', 'title');

    const signersSecurityOptions = useDropdownOptions(normalizeUsers(signersSecurity?.users), 'id_user', 'fullName');
    const signersCentralMarketingOptions = useDropdownOptions(normalizeUsers(signersCentralMarketing?.users), 'id_user', 'fullName');
    const signersAccountingOptions = useDropdownOptions(normalizeUsers(signersAccounting?.users), 'id_user', 'fullName');
    const signersLegalOptions = useDropdownOptions(normalizeUsers(signersLegal?.users), 'id_user', 'fullName');

    const generalDropdownFields = [
        {
            options: cityOptions,
            label: "Город расположения ДЦ",
            value: localCity,
            onSelect: (option: DropdownOption) => {
                if (activeDraftId) {
                    handleFieldChange("id_city", option.id, activeDraftId);
                    setLocalCity(option);
                }
            }
        },
        {
            options: organizationOptions,
            label: "Юр. лицо ГК",
            value: localOrganization,
            onSelect: (option: DropdownOption) => {
                if (activeDraftId) {
                    handleFieldChange("id_organization", option.id, activeDraftId);
                    setLocalOrganization(option);
                }
            }
        },
        {
            options: serviceTypeOptions,
            label: "Вид услуги",
            value: localServiceType,
            onSelect: (option: DropdownOption) => {
                if (activeDraftId) {
                    handleFieldChange("id_document_service_type", option.id, activeDraftId);
                    setLocalServiceType(option);
                }
            }
        },
        {
            options: partnerOptions,
            label: "Контрагент",
            value: localPartner,
            onSelect: (option: DropdownOption) => {
                if (activeDraftId) {
                    handleFieldChange("id_partner", option.id, activeDraftId);
                    setLocalPartner(option);
                }
            }
        },
    ]

    const signersDropdownFields = [
        {
            options: signersSecurityOptions,
            label: "Согласующий от СБ",
            searchPlaceholder: "Поиск сотрудника",
            value: signerSecurity,
            onSelect: (option: DropdownOption) => setSignerSecurity(option)
        },
        {
            options: signersCentralMarketingOptions,
            label: "Согласующий от ЦМ",
            searchPlaceholder: "Поиск сотрудника",
            value: signerCentralMarketing,
            onSelect: (option: DropdownOption) => setSignerCentralMarketing(option)
        },
        {
            options: signersAccountingOptions,
            label: "Согласующий бухгалтер",
            searchPlaceholder: "Поиск сотрудника",
            value: signerAccounting,
            onSelect: (option: DropdownOption) => setSignerAccounting(option)
        },{
            options: signersLegalOptions,
            label: "Согласующий юрист",
            searchPlaceholder: "Поиск сотрудника",
            value: signerLegal,
            onSelect: (option: DropdownOption) => setSignerLegal(option)
        },

    ]

    return (
        <div {...rest}>
            <div className="fields-block">
                <span className="fields-block__title">Общие данные</span>
                <div className="fields-block__fields">
                    {
                        generalDropdownFields.map((item, key) => (
                            <Dropdown
                                key={key}
                                options={item.options}
                                label={item.label}
                                value={item.value}
                                onSelect={item.onSelect}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="fields-block">
                <span className="fields-block__title">Согласующие</span>
                <div className="fields-block__fields">
                    {
                        signersDropdownFields.map((item, key) => (
                            <Dropdown
                                key={key}
                                options={item.options}
                                label={item.label}
                                searchPlaceholder={item.searchPlaceholder}
                                value={item.value}
                                onSelect={item.onSelect}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="fields-block">
                <span className="fields-block__title">Срок действия</span>
                <div className="fields-block__fields">
                    <DateRangePicker
                        from={documentDateActiveFrom}
                        to={documentDateActiveTo}
                        setFrom={setDocumentDateActiveFrom}
                        setTo={setDocumentDateActiveTo}
                    />
                </div>
            </div>
            <div className="fields-block">
                <span className="fields-block__title">Срок подписания</span>
                <div className="fields-block__fields">
                    <DateRangePicker
                        from={documentSigningFrom}
                        to={documentSigningTo}
                        setFrom={setDocumentSigningFrom}
                        setTo={setDocumentSigningTo}
                    />
                </div>
            </div>
        </div>
    );
};