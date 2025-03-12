import {baseApi} from "../api.ts";
import {Department} from "../interfaces/IDepartment.ts";

export const departmentApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getDepartments: builder.query<{status: string, departments: Department[]}, void>({
            query: () => ({
                url: `/Department/getDepartments.php`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetDepartmentsQuery,
} = departmentApi;