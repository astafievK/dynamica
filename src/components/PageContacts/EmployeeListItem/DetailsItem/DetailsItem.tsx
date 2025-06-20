import {FC, JSX, useRef, useState} from "react";
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PlaceIcon from '@mui/icons-material/Place';
import CakeIcon from '@mui/icons-material/Cake';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import { Employee } from "../../../../interfaces/IEmployee.ts";
import { AnimatePresence, motion } from "framer-motion";
import { useCopyToClipboard } from "../../../../store/hooks/useCopyToClipboard.ts";
import {useNotification} from "../../../Contexts/NotificationContext/NotificationContext.tsx";
import "./DetailsItem.css";

interface DetailsItemProps {
    title: string;
    value: string;
    isReadOnly?: boolean;
    employee: Employee;
}

const iconMap: Record<string, JSX.Element> = {
    "Должность": <BadgeRoundedIcon />,
    "Подразделение": <GroupRoundedIcon />,
    "Телефон": <PhoneRoundedIcon />,
    "Почта": <EmailRoundedIcon />,
    "День рождения": <CakeIcon />,
    "Город": <PlaceIcon />,
};

export const DetailsItem: FC<DetailsItemProps> = ({ title, value }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { copied, copyError, copyToClipboard } = useCopyToClipboard();
    const containerRef = useRef<HTMLDivElement>(null);
    const {notify} = useNotification();

    const handleClick = async () => {
        await copyToClipboard(value);
        notify({title: title, message: `Скопировано` });
    };

    return (
        <div
            className="details-item"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            ref={containerRef}
        >
            <div className="details-title">
                {iconMap[title]}
                <span>{title}</span>
            </div>
            <span className="detail">{value || "—"}</span>
            <AnimatePresence>
                {isHovered && value && (
                    <motion.div
                        key="copy-label"
                        className="copy-label"
                        initial={{ x: '105%', y: '-50%', opacity: 0 }}
                        animate={{ x: '-50%', y: '-50%', opacity: 1 }}
                        exit={{ x: '105%', y: '-50%' }}
                        transition={{ ease: 'easeOut', type: 'tween', duration: 0.15 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={copyError ? "error" : copied ? "copied" : "default"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="copy-label-content"
                            >
                                {copyError ? (
                                    <>
                                        <ReportProblemRoundedIcon/>
                                    </>
                                ) : copied ? (
                                    <>
                                        <CheckRoundedIcon/>
                                    </>
                                ) : (
                                    <>
                                        <ContentCopyRoundedIcon/>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
