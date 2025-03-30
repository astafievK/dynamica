import {Association} from "./Association/Association.tsx";
import {useGetDepartmentsQuery} from "../../../api/methods/departmentApi.ts";
import {FC} from "react";
import {AssociationSkeleton} from "../../Skeletons/AssociationSkeleton.tsx";
import {pageAnimation} from "../../../constants/motionSettins.ts";
import {motion} from "framer-motion";

export const AdminTabContacts: FC = () => {
    const { data: departmentsData, isLoading: isDepartmentsLoading } = useGetDepartmentsQuery();

    const departments = departmentsData?.departments ?? [];

    if (isDepartmentsLoading) {
        return (
            <div className="content-tab content-tab--contacts">
                <div className="associations-container">
                    {[...Array(3)].map((_, index) => (
                        <AssociationSkeleton key={index}/>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="content-tab content-tab--contacts">
            <motion.div {...pageAnimation} className="associations-container">
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
            </motion.div>
        </div>
    );
};
