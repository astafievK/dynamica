import {IDocumentServiceType} from "./IDocumentServiceType";
import { ICity } from "./ICity";
import {IUser} from "./IUser";
import { IOrganization } from "./IOrganization";
import {IPartner} from "./IPartner";
import {IDocumentStatus} from "./IDocumentStatus";

export interface IDocument {
    id_document: number;
    title: string;
    path: string;
    document_service_type: IDocumentServiceType;
    city: ICity;
    author: IUser;
    organization: IOrganization;
    partner: IPartner;
    document_status: IDocumentStatus;
    approvingPersons: IUser[];
}