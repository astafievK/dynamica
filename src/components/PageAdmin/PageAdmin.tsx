import { motion } from "framer-motion";
import {Outlet} from "react-router-dom";
import {pageAnimation} from "../../motionSettins.ts";
import {FC, useEffect} from "react";

export const PageAdmin: FC = () => {
    useEffect(() => {
        document.title = "Панель управления";
    });

    return (
        <>
            <div className="page page-admin">
                <div className="page-header">
                    <span className="page-title page-title__name">Панель управления</span>
                </div>
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    transition={pageAnimation.transition}
                    className="page-admin__content"
                >
                    <Outlet />
                </motion.div>
            </div>
        </>
    );
};
