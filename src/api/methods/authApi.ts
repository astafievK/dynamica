import {baseApi} from "../api.ts";
import {login} from "../slices/authSlice.ts";
import {ILoginCommand} from "../commands/ILoginCommand.ts";
import {ILoginResponse} from "../responses/ILoginResponse.ts";

export const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<ILoginResponse, ILoginCommand>({
            query: (data) => ({
                url: `/Users/login_user.php`,
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(login(data))
                } catch (err) {
                    console.log(err)
                }
            },
        }),
    }),
})

export const {
    useLoginMutation,
} = authApi