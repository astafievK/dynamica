import {Employee} from "../../interfaces/IEmployee.ts";

export interface GetUsersResponse {
    status: string,
    users: Employee[]
}