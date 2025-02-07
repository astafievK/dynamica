import { FC } from "react";
import {pageAnimation} from "../../motionSettins.ts";
import {motion} from "framer-motion";

export const PageContacts: FC = () => {
    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className={"page page-contacts"}>
            <div className="filters-container">
                <div className="filters-select">
                    <select className={"filter filter-select filter-city"}>
                        <option>Город</option>
                    </select>
                    <select className={"filter filter-select filter-organization"}>
                        <option>Организация</option>
                    </select>
                    <select className={"filter filter-select filter-district"}>
                        <option>Подразделение</option>
                    </select>
                </div>
            </div>
            <div className="employees-container">

            </div>
        </motion.div>
    );
};
