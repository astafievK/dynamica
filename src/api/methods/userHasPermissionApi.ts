import {baseApi} from "../api.ts";
import {IUserHasPermission} from "../../interfaces/IUserHasPermission.ts";
import {IUpdateUserPermissionCommand} from "../commands/IUpdateUserPermissionCommand.ts";

export const userHasPermissionApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUserHasPermission: builder.query<
            { status: string; permissions: IUserHasPermission[] },
            void
        >({
            query: () => ({
                url: `/user_has_permission/get_user_has_permission.php`,
                method: "GET",
            }),
            providesTags: ['Permission'],
        }),
        getUsersBySystemTitle: builder.query<
            { status: string; users: [{id_user: number, name: string, surname: string}] },
            { system_title: string }
        >({
            query: ({ system_title }) => ({
                url: `/user_has_permission/get_users_by_system_title.php?system_title=${encodeURIComponent(system_title)}`,
                method: "GET",
            }),
            providesTags: ['Permission'],
        }),
        getUserHasPermissionByIdUser: builder.query<
            { status: string; permissions: IUserHasPermission[] },
            { idUser: number }
        >({
            query: ({ idUser }) => ({
                url: `/user_has_permission/get_user_has_permission_by_id_user.php?id_user=${idUser}`,
                method: "GET",
            }),
            providesTags: (_, __, arg) => [
                { type: 'Permission', id: arg.idUser }
            ],
        }),
        getUserHasPermissionIdsByIdUser: builder.query<
            { status: string; permissions: number[] },
            { idUser: number }
        >({
            query: ({ idUser }) => ({
                url: `/user_has_permission/get_user_has_permission_ids_by_id_user.php?id_user=${idUser}`,
                method: "GET",
            }),
            providesTags: (_, __, arg) => [
                { type: 'Permission', id: arg.idUser }
            ],
        }),
        updateUserPermission: builder.mutation<
            { status: string; message: string },
            IUpdateUserPermissionCommand
        >({
            query: (body) => ({
                url: `/user_has_permission/update_user_has_permission.php`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_, __, arg) => [
                { type: 'Permission', id: arg.id_user }
            ],
        }),
    }),
})

export const {
    useGetUserHasPermissionQuery,
    useGetUserHasPermissionByIdUserQuery,
    useGetUsersBySystemTitleQuery,
    useGetUserHasPermissionIdsByIdUserQuery,
    useUpdateUserPermissionMutation,
} = userHasPermissionApi;