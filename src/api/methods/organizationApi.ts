import {baseApi} from "../api.ts";
import {Organization} from "../interfaces/IOrganization.ts";

export const organizationApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getOrganizations: builder.query<{status: string, organizations: Organization[]}, void>({
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