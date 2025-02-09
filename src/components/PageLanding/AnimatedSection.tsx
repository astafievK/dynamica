import React, { FC } from "react";
import { motion } from "framer-motion";
import {useScrollAnimation} from "../../store/hooks/useScrollAnimation.ts";

interface AnimatedSectionProps {
    children: React.ReactNode;
}

export const AnimatedSection: FC<AnimatedSectionProps> = ({ children }) => {
    const { elementRef, hasAnimated } = useScrollAnimation();

    return (
        <motion.div
            ref={elementRef}
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.7,
                ease: "easeOut", // Плавность анимации
            }}
        >
            {children}
        </motion.div>
    );
};
