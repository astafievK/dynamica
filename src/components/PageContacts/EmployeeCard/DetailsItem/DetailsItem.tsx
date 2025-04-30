import { FC, useRef, useState } from "react";
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PlaceIcon from '@mui/icons-material/Place';
import CakeIcon from '@mui/icons-material/Cake';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded'; // иконка ошибки
import { Employee } from "../../../../interfaces/IEmployee.ts";
import { AnimatePresence, motion } from "framer-motion";
import { useCopyToClipboard } from "../../../../store/hooks/useCopyToClipboard.ts";

interface DetailsItemProps {
    title: string;
    value: string;
    isReadOnly?: boolean;
    employee: Employee;
}

const iconMap: Record<string, JSX.Element> = {
    "Должность": <BadgeRoundedIcon />,
    "Подразделение": <GroupRoundedIcon />,
    "Контактный телефон": <PhoneRoundedIcon />,
    "Почта": <EmailRoundedIcon />,
    "День рождения": <CakeIcon />,
    "Населенный пункт": <PlaceIcon />,
};

export const DetailsItem: FC<DetailsItemProps> = ({ title, value }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { copied, copyError, copyToClipboard } = useCopyToClipboard();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = async () => {
        if (title === "Почта") {
            window.location.href = `mailto:${value}`;
        } else {
            await copyToClipboard(value);
        }
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

                <AnimatePresence>
                    {isHovered && value && (
                        <motion.div
                            key="copy-label"
                            className="copy-label"
                            initial={{ x: '105%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '105%' }}
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
            <span className="detail">{value || "Отсутствует"}</span>
        </div>
    );
};
