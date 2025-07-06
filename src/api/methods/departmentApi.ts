import {baseApi} from "../api.ts";
import {IDepartment} from "../../interfaces/IDepartment.ts";
import { CreateDepartmentCommand } from "../commands/ICreateDepartmentCommand.ts";
import {EditDepartmentTitleCommand} from "../commands/IEditDepartmentTitleCommand.ts";

export const departmentApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getDepartments: builder.query<{status: string, departments: IDepartment[]}, void>({
            query: () => ({
                url: `/department/get_departments.php`,
                method: "GET",
            }),
            providesTags: ['Department'],
        }),
        getDepartmentsTitlesNotNull: builder.query<{status: string, departments: string[]}, void>({
            query: () => ({
                url: `/department/get_departments_titles_not_null.php`,
                method: "GET",
            }),
            providesTags: ['Department'],
        }),
        createDepartment: builder.mutation<{status: string, message: string}, CreateDepartmentCommand>({
            query: (query) => ({
                url: `/department/create_new_department.php`,
                method: "POST",
                body: query
            }),
            invalidatesTags: ['Department'],
        }),
        editDepartmentTitleById: builder.mutation<{status: string, message: string}, EditDepartmentTitleCommand>({
            query: (query) => ({
                url: `/department/update_department_title.php`,
                method: "POST",
                body: query
            }),
            invalidatesTags: ['Department'],
        }),
    }),
})

export const {
    useGetDepartmentsQuery,
    useGetDepartmentsTitlesNotNullQuery,
    useCreateDepartmentMutation,
    useEditDepartmentTitleByIdMutation,
} = departmentApi;