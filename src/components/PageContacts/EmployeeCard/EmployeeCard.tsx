import { FC } from "react";
import {pageAnimation} from "../../../motionSettins.ts";
import { motion } from "framer-motion";

interface IEmployeeCardProps {
    name: string;
    position: string;
    division: string;
    city: string;
    email: string | null;
    phone: string;
    birthday: string;
    image: string;
}

export const EmployeeCard: FC<IEmployeeCardProps> = (props) => {
    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className="employee-card">
            <div
                className="employee-image"
                style={{ backgroundImage: `url(/${props.image})` }}
            />
            <div className="employee-info">
                <div className="employee-info__general">
                    <span className="employee-name">{props.name}</span>
                    <span className="employee-position">{props.position}</span>
                    <span className="employee-division">{props.division}</span>
                    <span className="employee-city">{props.city}</span>
                </div>
                <div className="sep"></div>
                <div className="employee-info__contacts">
                    <span className="employee-birthday">{props.birthday}</span>
                    <span className="employee-email">{props.email}</span>
                    <span className="employee-phone">{props.phone}</span>
                </div>
            </div>
        </motion.div>
    );
};
