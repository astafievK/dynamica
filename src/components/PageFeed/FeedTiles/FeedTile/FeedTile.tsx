import {FC} from "react";
import {formatDatetime} from "../../../../constants/functions.ts";
import { motion } from "framer-motion";
import {pageAnimation} from "../../../../constants/pageAnimation.ts";
import "./FeedTile.css";
import { Link } from "react-router-dom";

interface IFeedTileProps {
    id: number;
    isPinned?: boolean;
    title: string;
    date: string;
}

const MotionLink = motion.create(Link);

export const FeedTile: FC<IFeedTileProps> = ({ id, isPinned, title, date }) => {
    return (
        <MotionLink
            {...pageAnimation}
            className={`feed-tile${isPinned ? " pinned" : ""} grid-card`}
            to={`/feed/${id}`}
        >
            <div className="feed-tile__image">
                <img loading="lazy" src="" alt="Превью новости" />
            </div>
            <div className="feed-tile__info">
                <span className="feed-tile__date">{formatDatetime(date)}</span>
                <span className="feed-tile__title">{title}</span>
            </div>
        </MotionLink>
    );
};