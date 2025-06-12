import {moodleApi} from "../../moodleApi.ts";
import {IMoodleToken} from "../../../interfaces/moodle/IMoodleToken.ts";

export const tokenMoodleApi = moodleApi.injectEndpoints({
    endpoints: builder => ({
        getToken: builder.query<IMoodleToken, {username: string, password: string}>({
            query: (query) => ({
                url: `/login/token.php?username=${query.username}&password=${query.password}&service=${import.meta.env.VITE_MOODLE_API_SERVICE}`,
                method: "GET",
                params: query
            }),
        }),
    }),
})

export const {
    useGetTokenQuery,
} = tokenMoodleApi;