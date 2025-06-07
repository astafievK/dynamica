import {baseApi} from "../api.ts";
import {IUserHasUserFunction} from "../../interfaces/IUserHasUserFunction.ts";
import {IUpdateUserPermissionCommand} from "../commands/IUpdateUserPermissionCommand.ts";

export const userHasUserFunctionApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUserHasUserFunction: builder.query<{ status: string; functions: IUserHasUserFunction[] },
            void
        >({
            query: () => ({
                url: `/UserHasUserFunction/getUserHasUserFunction.php`,
                method: "GET",
            }),
            providesTags: ['UserFunction'],
        }),
        getUserHasUserFunctionByIdUser: builder.query<
            { status: string; functions: IUserHasUserFunction[] },
            { idUser: number }
        >({
            query: ({ idUser }) => ({
                url: `/UserHasUserFunction/getUserHasUserFunctionByIdUser.php?id_user=${idUser}`,
                method: "GET",
            }),
            providesTags: (_, __, arg) => [
                { type: 'UserFunction', id: arg.idUser }
            ],
        }),
        getUserHasUserFunctionIdsByIdUser: builder.query<
            { status: string; functions: number[] },
            { idUser: number }
        >({
            query: ({ idUser }) => ({
                url: `/UserHasUserFunction/getUserHasUserFunctionIdsByIdUser.php?id_user=${idUser}`,
                method: "GET",
            }),
            providesTags: (_, __, arg) => [
                { type: 'UserFunction', id: arg.idUser }
            ],
        }),
        updateUserPermission: builder.mutation<
            { status: string; message: string },
            IUpdateUserPermissionCommand
        >({
            query: (body) => ({
                url: `/UserHasUserFunction/updateUserHasUserFunction.php`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_, __, arg) => [
                { type: 'UserFunction', id: arg.id_user }
            ],
        }),
    }),
})

export const {
    useGetUserHasUserFunctionQuery,
    useGetUserHasUserFunctionByIdUserQuery,
    useGetUserHasUserFunctionIdsByIdUserQuery,
    useUpdateUserPermissionMutation,
} = userHasUserFunctionApi;