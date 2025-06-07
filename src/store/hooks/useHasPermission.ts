import {useTypedSelector} from "./redux.ts";

export const useHasPermission = (
    required: string | string[],
    mode: "any" | "all" = "any"
): boolean => {
    const user = useTypedSelector(state => state.auth.user);
    if (!user) return false;

    const userPermissions = user.permissions.map(p => p.system_title);

    if (userPermissions.includes("superuser")) return true;

    const requiredList = Array.isArray(required) ? required : [required];
    return mode === "all"
        ? requiredList.every(p => userPermissions.includes(p))
        : requiredList.some(p => userPermissions.includes(p));
};