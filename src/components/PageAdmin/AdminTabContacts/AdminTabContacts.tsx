import {Association} from "./Association/Association.tsx";
import {useGetCitiesQuery} from "../../../api/methods/cityApi.ts";
import {useGetDivisionsQuery} from "../../../api/methods/divisionApi.ts";
import {useGetOrganizationsQuery} from "../../../api/methods/organizationApi.ts";
import {useGetDepartmentsQuery} from "../../../api/methods/departmentApi.ts";
import {FC} from "react";

export const AdminTabContacts: FC = () => {
    const { data: citiesData, isLoading: isCitiesLoading } = useGetCitiesQuery();
    const { data: divisionsData, isLoading: isDivisionsLoading } = useGetDivisionsQuery();
    const { data: organizationsData, isLoading: isOrganizationsLoading } = useGetOrganizationsQuery();
    const { data: departmentsData, isLoading: isDepartmentsLoading } = useGetDepartmentsQuery();

    const cities = citiesData?.cities ?? [];
    const divisions = divisionsData?.divisions ?? [];
    const organizations = organizationsData?.organizations ?? [];

    if(isCitiesLoading || isDivisionsLoading || isOrganizationsLoading || isDepartmentsLoading) {
        return;
    }

    return (
        <div className="content-tab content-tab--contacts">
            <div className="associations-container">
                {
                    departmentsData!.departments.length > 0 ? (
                        departmentsData?.departments.map((item) => (
                            <Association
                                key={item.id_department}
                                optionsCity={cities}
                                optionsDivision={divisions}
                                optionsOrganization={organizations}
                                department={item}
                            />
                        ))
                    ) : (
                        <p className={"no-data"}>Данные отсутствуют</p>
                    )
                }
            </div>
        </div>
    );
};
