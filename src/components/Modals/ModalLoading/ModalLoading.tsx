import { FC,} from "react";
import {AnimatePresence, motion} from "framer-motion";

export const ModalLoading: FC= () => {
    return (
        <AnimatePresence>
            <motion.div
                className={`modal`}
                id="modalLoading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <img src="/logo-single.svg" className="spinner" alt={""}></img>
            </motion.div>
        </AnimatePresence>
    );
};
