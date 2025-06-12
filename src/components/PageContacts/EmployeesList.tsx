import React, { FC } from "react";
import { motion } from "framer-motion";
import { EmployeeCard } from "./EmployeeCard/EmployeeCard";
import { EmployeeCardSkeleton } from "../Skeletons/EmployeeCardSkeleton";
import { EmployeeCardLine } from "./EmployeeCardLine/EmployeeCardLine";
import { EmployeesHeader } from "./EmployeesHeader";
import { BannerNoData } from "../BannerNoData/BannerNoData";
import { pageAnimation } from "../../constants/motionSettings";
import {Employee} from "../../interfaces/IEmployee.ts";

interface EmployeesListProps {
    isLoading: boolean;
    users: Employee[];
    showHidden: boolean;
    isOldStyleEnabled: boolean;
}

export const EmployeesList: FC<EmployeesListProps> = React.memo(({
                                                          isLoading,
                                                          users,
                                                          showHidden,
                                                          isOldStyleEnabled,
                                                      }) => {
    const visibleUsers = showHidden ? users : users.filter((u) => !u.is_hidden);

    if (isLoading) {
        return (
            <motion.div
                initial={pageAnimation.initial}
                animate={pageAnimation.animate}
                exit={pageAnimation.exit}
                transition={pageAnimation.transition}
                className="employees-container page-content-item"
            >
                {[...Array(4)].map((_, i) => (
                    <EmployeeCardSkeleton key={i} />
                ))}
            </motion.div>
        );
    }

    if (!visibleUsers.length) {
        return <BannerNoData content={"Сотрудники не найдены"} />;
    }

    return (
        <div
            className={`employees-container page-content-item ${isOldStyleEnabled ? "old-style" : ""}`}
        >
            {isOldStyleEnabled && <EmployeesHeader />}
            {visibleUsers.map((employee) =>
                isOldStyleEnabled ? (
                    <EmployeeCardLine key={employee.id_user} employee={employee} />
                ) : (
                    <EmployeeCard key={employee.id_user} employee={employee} />
                )
            )}
        </div>
    );
});
