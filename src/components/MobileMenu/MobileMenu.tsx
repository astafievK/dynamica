import { FC } from "react";
import { setIsOpen } from "../../api/slices/mobileMenuSlice.ts";
import { useAppDispatch, useTypedSelector } from "../../store/hooks/redux.ts";
import { motion, AnimatePresence } from "framer-motion";
import "./MobileMenu.css";

export const MobileMenu: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useTypedSelector((state) => state.mobileMenuReducer.mobileMenuIsOpen);

    const handleClose = () => {
        dispatch(setIsOpen(false));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="mobile-menu" initial={false}>
                    {/* Spoiler (fade-in/out) */}
                    <motion.div
                        className="mobile-menu__spoiler"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.150 }}
                    />

                    {/* Content (slide-in/out) */}
                    <motion.div
                        className="mobile-menu__content"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.150, ease: "easeInOut" }}
                    >
                        <div className="mobile-menu__navigation">
                            {/* Навигация */}
                        </div>
                        <div className="mobile-menu__profile-container">
                            {/* Профиль */}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
