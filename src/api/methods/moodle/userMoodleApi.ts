import { moodleApi } from "../../moodleApi.ts";
import { IMoodleCourse } from "../../../interfaces/moodle/IMoodleCourse.ts";

export const userMoodleApi = moodleApi.injectEndpoints({
    endpoints: builder => ({
        getUserByField: builder.query<IMoodleCourse[], { token: string, field: string, value: string }>({
            query: ({ token, field, value }) => ({
                url: `/webservice/rest/server.php`,
                method: "GET",
                params: {
                    wstoken: token,
                    wsfunction: "core_user_get_users_by_field",
                    moodlewsrestformat: "json",
                    field,
                    'values[0]': value,
                },
            }),
        }),
    }),
});

export const {
    useGetUserByFieldQuery,
} = userMoodleApi;
