import { User } from "../../interfaces/IUser.ts";

export interface ILoginResponse {
    status: string;
    message?: string;
    user?: User;
}