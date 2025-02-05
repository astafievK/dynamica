import {baseApi} from "../api.ts";
import {login} from "../slices/authSlice.ts";
import {ILoginCommand} from "../interfaces/ILoginCommand.ts";
import {ILoginResult} from "../interfaces/ILoginResult.ts";

export const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<ILoginResult, ILoginCommand>({
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