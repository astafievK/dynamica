import {baseApi} from "../api.ts";
import {IDocumentType} from "../../interfaces/IDocumentType.ts";

export const documentTypeApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getDocumentTypes: builder.query<{status: string, types: IDocumentType[]}, void>({
            query: () => ({
                url: `/document_type/get_document_types.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetDocumentTypesQuery,
} = documentTypeApi;