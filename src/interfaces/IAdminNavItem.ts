import {Permission} from "../constants/permissions";

export interface IAdminNavItem {
    title: string;
    path: string;
    requiredPermissions: Permission[]
    isIgnore?: boolean;
}