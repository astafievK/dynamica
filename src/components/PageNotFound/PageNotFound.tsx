import {FC, useEffect} from "react";
import {motion} from "framer-motion";
import {pageAnimation} from "../../constants/motionSettins.ts";

export const PageNotFound: FC = () => {
    useEffect(() => {
        document.title = "Страница не найдена";
    })

    return (
        <>
            <motion.div
                key={"not-found"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={pageAnimation.transition}
                className="page page-not-found">
                <div className="page-header">
                    <span className="page-title page-title__name">Страницы не существует :(</span>
                </div>
            </motion.div>
        </>
    );
}
