import {FC} from "react";
import {useRippleEffect} from "../../../../store/hooks/useRippleEffect.ts";

interface IFeedTileProps {
    isPinned?: boolean;
    title: string;
    description?: string;
    date: string;
}

export const FeedTile: FC<IFeedTileProps> = ({ isPinned, title, description, date }) => {
    const createRipple = useRippleEffect();

    return (
        <button
            className={`feed-tile${isPinned ? " pinned" : ""}`}
            onClick={createRipple}
        >
            <div className="feed-tile__image">
                <img loading="lazy" src="/test pic.jpg" alt="Превью новости" />
            </div>
            <div className="feed-tile__info">
                <span className="feed-tile__title">{title}</span>
                <span className="feed-tile__date">{date}</span>
                {description && <span className="feed-tile__description">{description}</span>}
            </div>
        </button>
    );
};