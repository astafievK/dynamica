import {FC} from "react";
import {motion} from "framer-motion";
import {pageAnimation} from "../../constants/motionSettins.ts";

export const PageNotFound: FC = () => {
    return (
        <>
            <motion.div {...pageAnimation} className="page page-not-found">
                <div className="page-header">
                    <span className="page-title page-title__name">Страницы не существует :(</span>
                </div>
            </motion.div>
        </>
    );
}
