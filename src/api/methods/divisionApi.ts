import {baseApi} from "../api.ts";
import {IDivision} from "../../interfaces/IDivision.ts";

export const divisionApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getDivisions: builder.query<{status: string, divisions: IDivision[]}, void>({
            query: () => ({
                url: `/Division/getDivisions.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetDivisionsQuery,
} = divisionApi;