import {baseApi} from "../api.ts";
import {Department} from "../interfaces/IDepartment.ts";
import { CreateDepartmentCommand } from "../commands/ICreateDepartmentCommand.ts";
import {EditDepartmentTitleCommand} from "../commands/IEditDepartmentTitleCommand.ts";

export const departmentApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getDepartments: builder.query<{status: string, departments: Department[]}, void>({
            query: () => ({
                url: `/Department/getDepartments.php`,
                method: "GET",
            }),
            providesTags: ['Department'],
        }),
        getDepartmentsNotNull: builder.query<{status: string, departments: Department[]}, void>({
            query: () => ({
                url: `/Department/getDepartmentsNotNull.php`,
                method: "GET",
            }),
            providesTags: ['Department'],
        }),
        createDepartment: builder.mutation<{status: string, message: string}, CreateDepartmentCommand>({
            query: (query) => ({
                url: `/Department/createDepartment.php`,
                method: "POST",
                body: query
            }),
            invalidatesTags: ['Department'],
        }),
        editDepartmentTitle: builder.mutation<{status: string, message: string}, EditDepartmentTitleCommand>({
            query: (query) => ({
                url: `/Department/editDepartmentTitle.php`,
                method: "POST",
                body: query
            }),
            invalidatesTags: ['Department'],
        }),
    }),
})

export const {
    useGetDepartmentsQuery,
    useGetDepartmentsNotNullQuery,
    useCreateDepartmentMutation,
    useEditDepartmentTitleMutation,
} = departmentApi;