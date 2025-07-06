import {baseApi} from "../api.ts";
import {IDocumentServiceType} from "../../interfaces/IDocumentServiceType.ts";

export const documentServiceTypeApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getDocumentServiceTypes: builder.query<{status: string, types: IDocumentServiceType[]}, void>({
            query: () => ({
                url: `/document_service_type/get_document_service_types.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetDocumentServiceTypesQuery,
} = documentServiceTypeApi;