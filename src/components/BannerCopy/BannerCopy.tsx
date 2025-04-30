import { FC } from "react";
import {motion} from "framer-motion";

interface IBannerCopyProps {
    content?: string;
}

export const BannerCopy: FC<IBannerCopyProps> = ({ content = 'Скопировать' }) => {
    return (
        <motion.div
            initial={{right: -30, opacity: 0}}
            animate={{right: -10, opacity: 1}}
            exit={{right: -30, opacity: 0}}
            transition={{duration: 0.12, ease: "easeInOut"}}
            className="banner-copy"
        >
            <span>{content}</span>
        </motion.div>
    )
}