import {Association} from "./Association/Association.tsx";
import {useGetDepartmentsQuery} from "../../../api/methods/departmentApi.ts";
import {FC} from "react";
import {AssociationSkeleton} from "./AssociationSkeleton/AssociationSkeleton.tsx";
import {pageAnimation} from "../../../constants/pageAnimation.ts";
import {motion} from "framer-motion";
import {BannerNoData} from "../../BannerNoData/BannerNoData.tsx";

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
                <div className="associations-labels">

                </div>
                {departments.length > 0 ? (
                    departments.map((item) => (
                        <Association
                            key={item.id_department}
                            department={item}
                        />
                    ))
                ) : (
                    <BannerNoData content={"Отделы не найдены"}/>
                )}
            </motion.div>
        </div>
    );
};
