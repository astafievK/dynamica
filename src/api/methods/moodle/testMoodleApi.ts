import {baseApi} from "../../api.ts";
import {IMoodleUserTestsInfoResponse} from "../../../interfaces/moodle/IMoodleUserTestsInfoResponse.ts";
import {IMoodleTestStatus} from "../../../interfaces/moodle/IMoodleTestStatus.ts";

export const courseMoodleApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUserTests: builder.query<{status: string, tests: IMoodleUserTestsInfoResponse[]}, { idUser: number | undefined, limit?: number, status?: string }>({
            query: ({ idUser, limit, status }) => ({
                url: `/moodle/get_user_tests_info.php`,
                method: "GET",
                params: {
                    id_user: idUser,
                    ...(limit !== undefined ? { limit } : {}),
                    ...(status !== undefined ? { status } : {})
                },
            }),
        }),
        getStatuses: builder.query<{status: string, statuses: IMoodleTestStatus[]},  void>({
            query: () => ({
                url: `/moodle/get_tests_statuses.php`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetUserTestsQuery,
    useGetStatusesQuery,
} = courseMoodleApi;
