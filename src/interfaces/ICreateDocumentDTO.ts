export interface ICreateDocumentDTO {
    title: string;
    path?: string;
    typeId: number;                 // IDDocumentType
    serviceTypeId: number;          // IDDocumentServiceType
    cityId: number;                 // ICity
    organizationId: number;         // IOrganization
    partnerId: number;              // IPartner
    statusId?: number;              // по умолчанию 1 — Черновик
    approvingPersonIds: number[];   // массив id_user
}