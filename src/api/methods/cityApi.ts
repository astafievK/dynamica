import {baseApi} from "../api.ts";
import {City} from "../interfaces/ICity.ts";

export const cityApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getCities: builder.query<{status: string, cities: City[]}, void>({
            query: () => ({
                url: `/City/getCities.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetCitiesQuery,
} = cityApi;