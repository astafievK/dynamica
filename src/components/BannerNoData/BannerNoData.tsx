import { FC } from "react";
import { pageAnimation } from "../../constants/motionSettings";
import { motion } from "framer-motion";
import "./BannerNoData.css"

interface IBannerNoDataProps {
    content: string;
}

export const BannerNoData: FC<IBannerNoDataProps> = ({ content }) => {
    return (
        <motion.div
            {...pageAnimation}
            className="no-data"
        >
            <span>{content}</span>
        </motion.div>
    )
}