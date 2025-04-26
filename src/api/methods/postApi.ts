import {baseApi} from "../api.ts";
import { CreatePostCommand } from "../commands/ICreatePostCommand.ts";
import {GetPostsResponse} from "../responses/IGetPostsResponse.ts";
import {Post} from "../../interfaces/IPost.ts";

export const postApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<GetPostsResponse, void>({
            query: () => ({
                url: `/Posts/getPosts.php`,
                method: "GET",
            }),
        }),
        getPost: builder.query<{status: string, post: Post}, { id_post: number }>({
            query: ({ id_post }) => ({
                url: `/Posts/getPostById.php?id_post=${id_post}`,
                method: "GET",
            }),
        }),
        createPost: builder.mutation<{status: string, message: string}, CreatePostCommand>({
            query: (query) => ({
                url: `/Posts/createPost.php`,
                method: "POST",
                body: query
            })
        })
    }),
})

export const {
    useGetPostsQuery,
    useCreatePostMutation,
    useGetPostQuery,
} = postApi;