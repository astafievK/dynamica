import {Post} from "../interfaces/IPost.ts";

export interface GetPostsResponse {
    status: string,
    posts?: Post[]
    message?: string
}