import { FC } from "react";
import { FeedTile } from "./FeedTile/FeedTile.tsx";
import { useGetPostsQuery } from "../../../api/methods/postApi.ts";
import { FeedTileSkeleton } from "../../Skeletons/FeedTileSkeleton.tsx";

export const FeedTiles: FC = () => {
    const { data, isLoading } = useGetPostsQuery();

    if (!isLoading && (!data?.posts || data.posts.length === 0)) {
        return <p className="no-data">Данные отсутствуют</p>;
    }

    return (
        <div className="feed-tiles">
            {isLoading
                ? Array.from({ length: 4 }).map((_, index) => <FeedTileSkeleton key={index} />)
                : data?.posts.map((post) => (
                    <FeedTile
                        key={post.id_post}
                        id={post.id_post}
                        title={post.title}
                        date={post.date.date}
                    />
                ))}
        </div>
    );
};
