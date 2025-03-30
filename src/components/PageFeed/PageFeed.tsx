import {FC} from "react";
import {FeedTiles} from "./FeedTiles/FeedTiles.tsx";
import {pageAnimation} from "../../constants/motionSettins.ts";
import {motion} from "framer-motion";

export const PageFeed: FC = () => {
    return (
        <motion.div {...pageAnimation} className={"page page-feed"}>
            <div className="page-header">
                <span className="page-title page-title__name">Новости</span>
            </div>
            <FeedTiles/>
        </motion.div>
    )
}