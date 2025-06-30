import {baseApi} from "../api.ts";
import {login} from "../slices/authSlice.ts";
import {ILoginCommand} from "../commands/ILoginCommand.ts";
import {ILoginResponse} from "../responses/ILoginResponse.ts";
import {userMoodleApi} from "./moodle/userMoodleApi.ts";

export const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<ILoginResponse, ILoginCommand>({
            query: (data) => ({
                url: `/Users/login_user.php`,
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data.user) {
                        let userToDispatch = data.user;

                        if (data.user.email) {
                            const response = await dispatch(
                                userMoodleApi.endpoints.getUserByField.initiate({
                                    token: import.meta.env.VITE_MOODLE_API_TOKEN,
                                    field: "email",
                                    value: data.user.email,
                                })
                            ).unwrap();

                            if (response && response.length > 0 && response[0].id) {
                                userToDispatch = {
                                    ...data.user,
                                    moodleUser: response[0],
                                };
                            }
                        }

                        dispatch(login(userToDispatch));
                    }
                } catch (err) {
                    console.error(err);
                }
            },
        }),
    }),
})

export const {
    useLoginMutation,
} = authApi