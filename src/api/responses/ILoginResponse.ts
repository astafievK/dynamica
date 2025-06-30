import { IAuthorizedUser } from "../../interfaces/IAuthorizedUser.ts";

export interface ILoginResponse {
    status: string;
    message?: string;
    user?: IAuthorizedUser;
}