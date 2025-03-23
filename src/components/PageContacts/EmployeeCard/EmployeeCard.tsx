import { FC } from "react";
import {pageAnimation} from "../../../constants/motionSettins.ts";
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
        <motion.tr
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}>
            <td className="person">
                <div className="person-image-container">
                    <div className="person-image" style={{ backgroundImage: `url(/${props.image})` }}/>
                </div>
                <div className="person-general">
                    <span className={"person-general__name"}>{props.name}</span>
                    <span className={"person-general__phone"}>{props.phone} {props.phone && props.email && "•"} {props.email}</span>
                </div>
            </td>
            <td>
                <span>{props.division}</span>
            </td>
            <td>
                <span>{props.position}</span>
            </td>
            <td>
                <span>{props.city}</span>
            </td>
            <td>
                <span>{props.birthday}</span>
            </td>
        </motion.tr>
    );
};
