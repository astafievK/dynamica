import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const FeedTileSkeleton = () => {
    return (
        <div className="feed-tile feed-tile--skeleton">
            <Skeleton className="feed-tile__image" />
            <div className="feed-tile__info">
                <Skeleton className="skeleton-title" />
                <Skeleton className="skeleton-date" width="40%" />
            </div>
        </div>
    );
};
