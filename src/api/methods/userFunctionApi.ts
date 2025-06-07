import {baseApi} from "../api.ts";
import {IUserFunction} from "../../interfaces/IUserFunction.ts";

export const userFunctionApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUserFunction: builder.query<{status: string, functions: IUserFunction[]}, void>({
            query: () => ({
                url: `/UserFunction/getUserFunctions.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetUserFunctionQuery,
} = userFunctionApi;