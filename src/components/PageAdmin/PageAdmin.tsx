import { motion } from "framer-motion";
import {Outlet} from "react-router-dom";
import {pageAnimation} from "../../constants/motionSettins.ts";
import {FC} from "react";

export const PageAdmin: FC = () => {
    return (
        <>
            <div className="page page-admin">
                <div className="page-header">
                    <span className="page-title page-title__name">Администрирование</span>
                </div>
                <motion.div {...pageAnimation} className="page-admin__content">
                    <Outlet />
                </motion.div>
            </div>
        </>
    );
};
