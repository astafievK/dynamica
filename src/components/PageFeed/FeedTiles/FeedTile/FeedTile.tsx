import {FC} from "react";

interface IFeedTileProps {
    isPinned?: boolean;
    title: string;
    description?: string;
    date: string;
}

export const FeedTile: FC<IFeedTileProps> = (props) => {
    return(
        <div className={"feed-tile__container"}>
            <div className={"feed-tile" + (props.isPinned ? " pinned" : "")}>
                <div className="feed-tile__header">
                    <span className="feed-tile__title">{props.title}</span>
                    {
                        props.description &&
                        <span className="feed-tile__description">{props.description}</span>
                    }
                    <span className="feed-tile__date">{props.date}</span>
                </div>
                <div className="feed-tile__image">
                    <img src={"test pic.jpg"} alt={""}/>
                </div>
            </div>
        </div>
    )
}