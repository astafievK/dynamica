import {FC} from "react";
import {formatDatetime} from "../../../../functions.ts";
import { motion } from "framer-motion";
import {pageAnimation} from "../../../../motionSettins.ts";

interface IFeedTileProps {
    id: number;
    isPinned?: boolean;
    title: string;
    date: string;
}

export const FeedTile: FC<IFeedTileProps> = ({ id, isPinned, title, date }) => {
    return (
        <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={pageAnimation.transition}
            className={`feed-tile${isPinned ? " pinned" : ""}`}
            href={`/feed/${id}`}
        >
            <div className="feed-tile__image">
                <img loading="lazy" src="/test pic.jpg" alt="Превью новости" />
            </div>
            <div className="feed-tile__info">
                <span className="feed-tile__date">{formatDatetime(date)}</span>
                <h2 className="feed-tile__title">{title}</h2>
            </div>
        </motion.a>
    );
};