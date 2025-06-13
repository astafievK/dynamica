import { FC } from "react";
import './TestCard.css'
import EventIcon from '@mui/icons-material/Event';
import { Link } from "react-router-dom";
import {formatUnixTime, getRemainingTimeString} from "../../../../utils/date.ts";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import {formatTasksCount} from "../../../../utils/formatTasksCount.ts";

interface ITestCardProps {
    title: string;
    status: "Новое" | "В процессе" | "Завершено"
    id: number;
    quizEndUnix: number | null;
    questionsCount: number | null;
}

export const TestCard: FC<ITestCardProps> = ({ title, status, id, quizEndUnix, questionsCount }) => {
    const renderDate = () => {
        if (quizEndUnix && quizEndUnix !== 0) {
            return (
                <div className="test-card__dates">
                    <EventIcon />
                    <span>до {formatUnixTime(quizEndUnix)}</span>
                </div>
            );
        }

        return null;
    };

    const renderExpires = () => {
        const now = Date.now() / 1000;

        if (quizEndUnix && quizEndUnix > now) {
            return (
                <div className="test-card__expires">
                    <TimelapseIcon />
                    <span>{getRemainingTimeString(Date.now() / 1000, quizEndUnix)}</span>
                </div>
            );
        }

        return null;
    };

    return (
        <Link to={`${import.meta.env.VITE_MOODLE_API_URL}/mod/quiz/view.php?id=${id}`} className="widget-item test-card">
            <div className="test-card__general">
                <div className="test-card__status">{status}</div>
                <span className="test-card__title">{title}</span>
                {renderDate()}
            </div>

            <div className="test-card__info">
                {questionsCount && <span className="test-card__size">{formatTasksCount(questionsCount)}</span>}
                {renderExpires()}
            </div>
        </Link>
    );
}
