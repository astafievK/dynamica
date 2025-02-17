import {FC} from "react";
import {FeedTile} from "./FeedTile/FeedTile.tsx";

export const FeedTiles: FC = () => {
    return(
        <div className={"feed-tiles"}>
            <FeedTile
                title={"Противоположная точка зрения подразумевает"}
                date={"01.01.1999"}
            />
            <FeedTile
                title={"Противоположная точка зрения подразумевает"}
                date={"01.01.1999"}
            />
            <FeedTile
                title={"Противоположная точка зрения подразумевает"}
                date={"01.01.1999"}
            />
            <FeedTile
                title={"Противоположная точка зрения подразумевает"}
                date={"01.01.1999"}
            />
            <FeedTile
                title={"Противоположная точка зрения подразумевает"}
                date={"01.01.1999"}
            />
            <FeedTile
                title={"Противоположная точка зрения подразумевает"}
                date={"01.01.1999"}
            />
            <FeedTile
                title={"Противоположная точка зрения подразумевает"}
                date={"01.01.1999"}
            />
        </div>
    )
}