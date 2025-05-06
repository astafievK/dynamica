import {motion } from "framer-motion";
import React, {FC, useMemo} from "react";
import {pageAnimation} from "../../constants/motionSettings.ts";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = React.memo(({ currentPage, totalPages, onPageChange }) => {
    const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

    return (
        <motion.div {...pageAnimation} className="pagination-container">
            <div className="pagination">
                {pages.map((page) => (
                    <button
                        key={page}
                        className={currentPage === page ? "active" : ""}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </motion.div>
    );
});
