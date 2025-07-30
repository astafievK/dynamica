import {baseApi} from "../api.ts";
import {IDraftTab} from "../../interfaces/IDraftTab.ts";
import {IDocument} from "../../interfaces/IDocument.ts";

export const documentApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getDocumentById: builder.query<{status: string, document: IDocument}, { id_document: number }>({
            query: ({ id_document }) => ({
                url: `/document/get_document.php`,
                method: "GET",
                params: {
                    id_document
                }
            }),
            providesTags: ["Document"],
        }),
        getDocumentsTabsByAuthor: builder.query<{status: string, tabs: IDraftTab[]}, { id_author: number }>({
            query: ({ id_author }) => ({
                url: `/document/get_documents_tabs_by_author.php`,
                method: "GET",
                params: {
                    id_author
                }
            }),
            providesTags: ["DocumentsTabs"],
        }),
        updateDocumentField: builder.mutation<{status: string, message: string}, { id_document: number, field: string, value: string | number }>({
            query: (query) => ({
                url: `/document/update_document_field.php`,
                method: "POST",
                body: query
            }),
            invalidatesTags: ["Document", "DocumentsTabs"],
        }),
        createNewDocument: builder.mutation<{status: string, message: string, id_document?: number}, { id_author: number }>({
            query: (query) => ({
                url: `/document/create_new_document.php`,
                method: "POST",
                body: query
            }),
            invalidatesTags: ["DocumentsTabs", "Documents"],
        }),
        deleteDocument: builder.mutation<{status: string, message: string, id_document?: number, details?: string}, { id_document: number }>({
            query: (query) => ({
                url: `/document/delete_document.php`,
                method: "POST",
                body: query
            }),
            invalidatesTags: ["DocumentsTabs", "Documents"],
        }),
        deleteDocumentFile: builder.mutation<{status: string, message: string, id_document?: number, details?: string}, { id_document: number }>({
            query: (query) => ({
                url: `/document/delete_document_file.php`,
                method: "POST",
                body: query
            }),
            invalidatesTags: ["Document"],
        }),
        uploadDocumentFile: builder.mutation<{ status: string; message: string; path?: string }, FormData>({
            query: (formData) => ({
                url: `/document/upload_document_file.php`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Document"],
        }),
    }),
})

export const {
    useGetDocumentByIdQuery,
    useGetDocumentsTabsByAuthorQuery,
    useUpdateDocumentFieldMutation,
    useCreateNewDocumentMutation,
    useDeleteDocumentMutation,
    useUploadDocumentFileMutation
} = documentApi;