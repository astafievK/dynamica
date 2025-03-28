import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FC } from "react";
import {pageAnimation} from "../../constants/motionSettins.ts";
import { motion } from "framer-motion";

export const EmployeeCardSkeleton: FC = () => {
    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={{duration: 0.14}}
            className="employee-card-skeleton">
            <Skeleton containerClassName="employee-image" />
            <div className="employee-card__general">
                <div className="employee-card__name">
                    <Skeleton containerClassName="employee-lastname" width="65%"/>
                    <Skeleton containerClassName="employee-firstname" width="60%" />
                    <Skeleton containerClassName="employee-middlename" width="80%" />
                </div>
                <Skeleton containerClassName="employee-position" width="50%" />
            </div>
        </motion.div>
    );
};