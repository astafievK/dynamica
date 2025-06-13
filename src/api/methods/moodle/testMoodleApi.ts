import {baseApi} from "../../api.ts";
import {IMoodleUserTestsInfoResponse} from "../../../interfaces/moodle/IMoodleUserTestsInfoResponse.ts";

export const courseMoodleApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUserTests: builder.query<{status: string, data: IMoodleUserTestsInfoResponse[]}, { idUser: number | undefined }>({
            query: ({ idUser }) => ({
                url: `/moodle/get_user_tests_info.php`,
                method: "GET",
                params: {
                    id_user: idUser,
                },
            }),
        }),
    }),
});

export const {
    useGetUserTestsQuery,
} = courseMoodleApi;
