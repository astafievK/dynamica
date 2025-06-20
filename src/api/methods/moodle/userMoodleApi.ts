import {baseApi} from "../../api.ts";
import {IMoodleUser} from "../../../interfaces/moodle/IMoodleUser.ts";

export const userMoodleApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUserByField: builder.query<IMoodleUser[], { token: string, field: string, value: string }>({
            query: ({ token, field, value }) => ({
                url: `moodle/get_user.php`,
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
