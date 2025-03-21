import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FC } from "react";
import {pageAnimation} from "../../motionSettins.ts";
import { motion } from "framer-motion";

export const EmployeeCardSkeleton: FC = () => {
    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className="employee-card-skeleton">
            <Skeleton containerClassName="employee-image" />
            <div className="employee-info">
                <div className="employee-info__general">
                    <Skeleton containerClassName="employee-name" width="100%"/>
                    <Skeleton containerClassName="employee-position" width="80%" />
                    <Skeleton containerClassName="employee-division" width="70%" />
                    <Skeleton containerClassName="employee-city" width="50%" />
                </div>
                <div className="sep"></div>
                <div className="employee-info__contacts">
                    <Skeleton containerClassName="employee-birthday" width="25%" />
                    <Skeleton containerClassName="employee-email" width="25%" />
                    <Skeleton containerClassName="employee-phone" width="25%" />
                </div>
            </div>
        </motion.div>
    );
};