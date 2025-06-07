import {baseApi} from "../api.ts";
import {IOrganization} from "../../interfaces/IOrganization.ts";

export const organizationApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getOrganizations: builder.query<{status: string, organizations: IOrganization[]}, void>({
            query: () => ({
                url: `/Organization/getOrganizations.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetOrganizationsQuery,
} = organizationApi;