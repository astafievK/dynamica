import React, { FC } from "react";
import './TestCard.css'
import EventIcon from '@mui/icons-material/Event';
import {formatUnixTime, getRemainingTimeString} from "../../../../../utils/date.ts";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import {formatTasksCount} from "../../../../../utils/formatTasksCount.ts";
import { motion } from "framer-motion";
import {pageAnimation} from "../../../../../constants/pageAnimation.ts";

interface ITestCardProps {
    title: string;
    status: string;
    typeTitle: string;
    systemTypeTitle: string;
    id: number;
    quizOpenUnix: number | null;
    quizFinishUnix: number | null;
    userStartUnix: number | null;
    userFinishUnix: number | null;
    questionsCount: number | null;
}

export const TestCard: FC<ITestCardProps> = ({ title, status, typeTitle, systemTypeTitle, id, quizOpenUnix, quizFinishUnix, userFinishUnix, questionsCount }) => {
    const renderDate = () => {
        if (quizFinishUnix && quizFinishUnix !== 0) {
            return (
                <div className="test-card__dates">
                    <EventIcon />
                    <span>до {formatUnixTime(quizFinishUnix)}</span>
                </div>
            );
        }

        if (quizOpenUnix && !quizFinishUnix) {
            return (
                <div className="test-card__dates">
                    <EventIcon />
                    <span>ထ</span>
                </div>
            );
        }

        return null;
    };

    const renderExpires = () => {
        const now = Date.now() / 1000;

        if (userFinishUnix) return

        if (quizOpenUnix && quizOpenUnix !== 0 && quizOpenUnix > now) {
            return (
                <div className="test-card__expires">
                    <span>Откроется {formatUnixTime(quizOpenUnix)}</span>
                </div>
            );
        }

        if (quizFinishUnix && quizFinishUnix > now) {
            return (
                <div className="test-card__expires">
                    <TimelapseIcon />
                    <span>{getRemainingTimeString(now, quizFinishUnix)}</span>
                </div>
            );
        }

        return null;
    };

    const getStatusStyle = (status: string): React.CSSProperties => {
        switch (status) {
            case "Новое":
                return { borderColor: 'var(--color-accent-500)' };
            case "В процессе":
                return { borderColor: '#856404' };
            case "Завершено":
                return { borderColor: 'var(--color-gray-50)' };
            default:
                return { borderColor: 'var(--color-gray-50)' };
        }
    };

    return (
        <motion.a
            {...pageAnimation}
            href={`${import.meta.env.VITE_MOODLE_API_URL}/mod/${systemTypeTitle}/view.php?id=${id}`}
            className="widget-item test-card grid-card"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="test-card__labels">
                <span className="test-card__type">{typeTitle}</span>
                <span className="test-card__status" style={getStatusStyle(status)}>{status}</span>
            </div>

            <span className="test-card__title">{title}</span>
            {renderDate()}

            <div className="test-card__info">
                {questionsCount && <span className="test-card__size">{formatTasksCount(questionsCount)}</span>}
                {renderExpires()}
            </div>
        </motion.a>
    );
}
