import {IAdminNavItem} from "../interfaces/IAdminNavItem.ts";
import {Permissions} from "./permissions.ts";

export const adminNavItems: IAdminNavItem[] = [
    { title: "Отделы", path: "/admin/contacts", requiredPermissions: [Permissions.CreateUpdateNews, Permissions.Superuser] },
    { title: "Новости", path: "/admin/feed", requiredPermissions: [Permissions.CreateUpdateNews, Permissions.Superuser] },
];