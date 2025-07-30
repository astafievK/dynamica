import { FC } from "react";
import { FeedTile } from "./FeedTile/FeedTile.tsx";
import { useGetPostsQuery } from "../../../../api/methods/postApi.ts";
import { FeedTileSkeleton } from "./FeedTileSkeleton/FeedTileSkeleton.tsx";
import {BannerNoData} from "../../../BannerNoData/BannerNoData.tsx";
import "./FeedTiles.css"
import {useHasPermission} from "../../../../store/hooks/useHasPermission.ts";
import {Permissions} from "../../../../constants/permissions.ts";

export const FeedTiles: FC = () => {
    const { data, isLoading } = useGetPostsQuery();
    const isDeveloper = useHasPermission(Permissions.Developer)

    if ((!isLoading && (!data?.posts || data.posts.length === 0)) || !isDeveloper) {
        return (
            <BannerNoData content={"Новостей нет"}/>
        );
    }

    return (
        <div className="feed-tiles">
            {isLoading
                ? Array.from({ length: 4 }).map((_, index) => <FeedTileSkeleton key={index} />)
                : data?.posts?.map((post) => (
                    <FeedTile
                        key={post.id_post}
                        id={post.id_post}
                        title={post.title}
                        date={post.date.date}
                    />
                ))
            }
        </div>
    );
};
