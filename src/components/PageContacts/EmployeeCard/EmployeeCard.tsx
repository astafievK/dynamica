import {FC, useState} from "react";
import {pageAnimation} from "../../../constants/motionSettins.ts";
import {AnimatePresence, motion} from "framer-motion";

interface IEmployeeCardProps {
    name: string;
    surname: string;
    patronymic: string;
    position: string;
    division: string;
    city: string;
    email: string | null;
    phone: string;
    birthday: string;
    image: string;
}

export const EmployeeCard: FC<IEmployeeCardProps> = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className={`employee-card ${isHovering ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="employee-card__preview">
                <div className="employee-card__photo" style={{ backgroundImage: `url(/default.webp)` }}>
                    <AnimatePresence>
                        {
                            isHovering &&
                            <motion.button
                                initial={{opacity: 0, bottom: 0}}
                                animate={{opacity: 1, bottom: 10}}
                                exit={{opacity: 0, bottom: 0}}
                                transition={{duration: 0.05}}
                                className="upload-photo"
                            >
                                Загрузить
                            </motion.button>
                        }
                    </AnimatePresence>
                </div>
                <div className="employee-card__general">
                    <div className="employee-card__name">
                        <span className="employee-card__lastname">{props.surname}</span>
                        <span className="employee-card__firstname">{props.name}</span>
                        <span className="employee-card__middlename">{props.patronymic}</span>
                    </div>
                    <span className="employee-card__position">{props.position}</span>
                </div>
            </div>
            <AnimatePresence>
                {
                    isHovering &&
                    <motion.div
                        initial={pageAnimation.initial}
                        animate={pageAnimation.animate}
                        exit={pageAnimation.exit}
                        transition={{duration: 0.1}}
                        className="employee-card__details">
                        {
                            props.division &&
                            <div className="details-item details-item__division">
                                <span className="details-title">Группа</span>
                                <span className="detail">{props.division}</span>
                            </div>
                        }
                        {
                            props.phone &&
                            <div className="details-item details-item__phone">
                                <span className="details-title">Контактный телефон</span>
                                <span className="detail">{props.phone}</span>
                            </div>
                        }
                        {
                            props.email &&
                            <div className="details-item details-item__email">
                                <span className="details-title">Почта</span>
                                <span className="detail">{props.email}</span>
                            </div>
                        }
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    );
};
