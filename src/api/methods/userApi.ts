import {baseApi} from "../api.ts";
import {GetUsersResponse} from "../responses/IGetUsersResponse.ts";

export const userApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<GetUsersResponse, void>({
            query: () => ({
                url: `/Users/getUsers.php`,
                method: "GET",
            }),
        }),
        getUsersNotRetired: builder.query<GetUsersResponse, void>({
            query: () => ({
                url: `/Users/getUsersNotRetired.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetUsersNotRetiredQuery
} = userApi;