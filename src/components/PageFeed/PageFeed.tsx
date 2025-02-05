import {FC} from "react";
import {FeedTiles} from "./FeedTiles/FeedTiles.tsx";
import {pageAnimation} from "../../motionSettins.ts";
import { motion } from "framer-motion";

export const PageFeed: FC = () => {
    return(
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className={"page page-feed"}>
            <div className="rectangle"></div>
            <h1>Новости</h1>
            <FeedTiles/>
        </motion.div>
    )
}