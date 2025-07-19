import {FC} from "react";
import {FeedTiles} from "./FeedTiles/FeedTiles.tsx";
import {pageAnimation} from "../../constants/pageAnimation.ts";
import {motion} from "framer-motion";

export const PageFeed: FC = () => {
    return (
        <motion.div {...pageAnimation} className={"page page-feed"}>
            <div className="page-content">
                <FeedTiles/>
            </div>
        </motion.div>
    )
}