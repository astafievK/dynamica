import {Association} from "./Association/Association.tsx";
import {useGetDepartmentsQuery} from "../../../api/methods/departmentApi.ts";
import {FC} from "react";
import {AssociationSkeleton} from "../../Skeletons/AssociationSkeleton.tsx";

export const AdminTabContacts: FC = () => {
    const { data: departmentsData, isLoading: isDepartmentsLoading, isFetching: isDepartmentsFetching } = useGetDepartmentsQuery();

    const departments = departmentsData?.departments ?? [];

    if (isDepartmentsLoading || isDepartmentsFetching) {
        return (
            <div className="content-tab content-tab--contacts">
                <div className="associations-container">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="association-skeleton">
                            <AssociationSkeleton/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="content-tab content-tab--contacts">
            <div className="associations-container">
                {departments.length > 0 ? (
                    departments.map((item) => (
                        <Association
                            key={item.id_department}
                            department={item}
                        />
                    ))
                ) : (
                    <p className="no-data">Данные отсутствуют</p>
                )}
            </div>
        </div>
    );
};
