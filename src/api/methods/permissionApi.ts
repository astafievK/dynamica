import {baseApi} from "../api.ts";
import {IPermission} from "../../interfaces/IPermission.ts";

export const permissionApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getPermission: builder.query<{status: string, functions: IPermission[]}, void>({
            query: () => ({
                url: `/permission/get_permission.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetPermissionQuery,
} = permissionApi;