import { FC } from "react";
import { FeedTile } from "./FeedTile/FeedTile.tsx";
import { useGetPostsQuery } from "../../../api/methods/postApi.ts";
import { ModalLoading } from "../../Modals/ModalLoading/ModalLoading.tsx";

export const FeedTiles: FC = () => {
        const { data, isLoading } = useGetPostsQuery();

        if (isLoading) return <ModalLoading />;

        if (!data?.posts?.length) {
                return <div className="feed-tiles__empty">Нет доступных постов</div>;
        }

        return (
            <div className="feed-tiles">
                    {data.posts.map((post) => (
                        <FeedTile key={post.id_post} id={post.id_post} title={post.title} date={post.date.date}/>
                    ))}
            </div>
        );
}
