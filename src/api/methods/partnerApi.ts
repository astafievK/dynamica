import {baseApi} from "../api.ts";
import {IPartner} from "../../interfaces/IPartner.ts";

export const documentTypeApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getPartners: builder.query<{status: string, partners: IPartner[]}, void>({
            query: () => ({
                url: `/partner/get_partners.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetPartnersQuery,
} = documentTypeApi;