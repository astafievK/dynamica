import {baseApi} from "../api.ts";
import {Position} from "../interfaces/IPosition.ts";

export const positionApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getPositions: builder.query<{status: string, positions: Position[]}, void>({
            query: () => ({
                url: `/Position/getPositions.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetPositionsQuery,
} = positionApi;