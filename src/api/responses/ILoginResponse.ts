import { User } from "../interfaces/IUser.ts";

export interface ILoginResponse {
    status: string;
    user: User;
    message?: string;
}