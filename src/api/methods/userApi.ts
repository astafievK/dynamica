import { baseApi } from "../api.ts";
import { GetUsersResponse } from "../responses/IGetUsersResponse.ts";
import { IUser } from "../../interfaces/IUser.ts";
import {UpdateUserCommand} from "../commands/IUpdateUserCommand.ts";

export const userApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUserById: builder.query<IUser, { id_user: number }>({
            query: ({ id_user }) => ({
                url: `/Users/getUser.php?id_user=${id_user}`,
                method: "GET",
            }),
            providesTags: (_, __, { id_user }) => [{ type: "Employee", id: id_user }],
        }),
        getUsersIdsNotRetired: builder.query<{status: string, users?: number[], message?: string}, void>({
            query: () => ({
                url: `/Users/getUsersIdsNotRetired.php`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        getUsersIdsFiltered: builder.query<{status: string, users?: number[], message?: string}, { department: string; search?: string }>({
            query: ({ department, search = "" }) => ({
                url: `/Users/getUsersIdsFiltered.php?department=${encodeURIComponent(department)}&search=${encodeURIComponent(search)}`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        getUsers: builder.query<GetUsersResponse, void>({
            query: () => ({
                url: `/Users/getUsers.php`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        getUsersNotRetired: builder.query<GetUsersResponse, void>({
            query: () => ({
                url: `/Users/getUsersNotRetired.php`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        getUsersFiltered: builder.query<GetUsersResponse, { department: string; search?: string;}>(
            {
                query: ({ department, search = "" }) => ({
                    url: `/Users/getUsersFiltered.php?department=${encodeURIComponent(department)}&search=${encodeURIComponent(search)}`,
                    method: "GET",
                }),
                providesTags: ["Employee"],
            }
        ),
        uploadProfileImage: builder.mutation<{ status: string; message: string; path?: string, user?: string, image?: string }, FormData>({
            query: (formData) => ({
                url: "/Users/uploadProfileImage.php",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Employee"],
        }),
        deleteProfileImage: builder.mutation<{ status: string; message: string }, { id_user: number }>({
            query: (query) => ({
                url: "/Users/deleteProfileImage.php",
                method: "POST",
                body: query,
            }),
            invalidatesTags: ["Employee"],
        }),
        patchUserVisibility: builder.mutation<{ status: string; message: string }, { id_user: number }>({
            query: (query) => ({
                url: `/Users/setIsHidden.php?id_user=${query.id_user}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Employee"],
        }),
        patchUserEmail: builder.mutation<{ status: string; message: string }, { id_user: number, email: string }>({
            query: (query) => ({
                url: `/Users/setEmail.php?id_user=${query.id_user}&email=${query.email}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Employee"],
        }),
        updateUser: builder.mutation<{ status: string; message: string }, UpdateUserCommand>({
            query: (body) => ({
                url: `/Users/updateUser.php`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Employee"],
        }),
    }),
});

export const {
    useGetUserByIdQuery,
    useGetUsersIdsNotRetiredQuery,
    useGetUsersQuery,
    useGetUsersIdsFilteredQuery,
    useGetUsersNotRetiredQuery,
    useGetUsersFilteredQuery,
    useUploadProfileImageMutation,
    useDeleteProfileImageMutation,
    usePatchUserVisibilityMutation,
    usePatchUserEmailMutation,
    useUpdateUserMutation,
} = userApi;
