import { moodleApi } from "../../moodleApi.ts";
import { IMoodleCourse } from "../../../interfaces/moodle/IMoodleCourse.ts";

export const courseMoodleApi = moodleApi.injectEndpoints({
    endpoints: builder => ({
        getUsersCourses: builder.query<IMoodleCourse[], { token: string, idUser: number | undefined }>({
            query: ({ token, idUser }) => ({
                url: `/webservice/rest/server.php`,
                method: "GET",
                params: {
                    wstoken: token,
                    wsfunction: "core_enrol_get_users_courses",
                    moodlewsrestformat: "json",
                    userid: idUser,
                },
            }),
        }),
    }),
});

export const {
    useGetUsersCoursesQuery,
} = courseMoodleApi;
