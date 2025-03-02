import {FC} from "react";
import {formatDate} from "../../../../functions.ts";
import {Link} from "react-router-dom";

interface IFeedTileProps {
    id: number;
    isPinned?: boolean;
    title: string;
    date: string;
}

export const FeedTile: FC<IFeedTileProps> = ({ id, isPinned, title, date }) => {
    return (
        <Link
            className={`feed-tile${isPinned ? " pinned" : ""}`}
            to={`/feed/${id}`}
        >
            <div className="feed-tile__image">
                <img loading="lazy" src="/test pic.jpg" alt="Превью новости" />
            </div>
            <div className="feed-tile__info">
                <span className="feed-tile__date">{formatDate(date)}</span>
                <h2 className="feed-tile__title">{title}</h2>
            </div>
        </Link>
    );
};