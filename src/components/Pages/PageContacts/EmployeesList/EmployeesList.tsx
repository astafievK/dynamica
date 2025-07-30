import React, { FC } from "react";
import { motion } from "framer-motion";
import { EmployeeListItem } from "../EmployeeListItem/EmployeeListItem.tsx";
import { EmployeeListItemSkeleton } from "../../../Skeletons/EmployeeListItemSkeleton.tsx";
import { EmployeeCardLine } from "../EmployeeCardLine/EmployeeCardLine.tsx";
import { EmployeesHeader } from "../EmployeesHeader/EmployeesHeader.tsx";
import { BannerNoData } from "../../../BannerNoData/BannerNoData.tsx";
import { pageAnimation } from "../../../../constants/pageAnimation.ts";
import {IUser} from "../../../../interfaces/IUser.ts";
import "./EmployeesList.css";

interface EmployeesListProps {
    isLoading: boolean;
    users: IUser[];
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
                className="employees-list page-item"
            >
                {[...Array(4)].map((_, i) => (
                    <EmployeeListItemSkeleton key={i} />
                ))}
            </motion.div>
        );
    }

    if (!visibleUsers.length) {
        return <BannerNoData content={"Сотрудники не найдены"} />;
    }

    return (
        <div
            className={`employees-list page-item ${isOldStyleEnabled ? "old-style" : ""}`}
        >
            {isOldStyleEnabled && <EmployeesHeader />}
            {visibleUsers.map((employee) =>
                isOldStyleEnabled ? (
                    <EmployeeCardLine key={employee.id_user} employee={employee} />
                ) : (
                    <EmployeeListItem key={employee.id_user} employee={employee} />
                )
            )}
        </div>
    );
});
