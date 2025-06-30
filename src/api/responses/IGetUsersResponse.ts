import {IUser} from "../../interfaces/IUser.ts";

export interface GetUsersResponse {
    status: string,
    users: IUser[]
}