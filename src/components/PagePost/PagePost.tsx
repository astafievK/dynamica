import { FC, useEffect } from "react";
import { pageAnimation } from "../../motionSettins.ts";
import { motion } from "framer-motion";
import { useGetPostQuery } from "../../api/methods/postApi.ts";
import { ModalLoading } from "../Modals/ModalLoading/ModalLoading.tsx";
import { useParams } from "react-router-dom";
import { formatDate } from "../../functions.ts";
import { PageNotFound } from "../PageNotFound/PageNotFound.tsx";

export const PagePost: FC = () => {
    const { idPost } = useParams();
    const { data, isLoading } = useGetPostQuery({ id_post: Number(idPost) });

    useEffect(() => {
        if (data?.post) {
            document.title = data.post.title;
        }
    }, [data]);

    if (isLoading) {
        return <ModalLoading />;
    }

    if (!data?.post) {
        return <PageNotFound />;
    }

    return (
        <motion.div
            key={"feed"}
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className={"page page-post"}
        >
            <div className="page-header">
                <span className="page-title">{data.post.title}</span>
                <span className="date">{data.post.date_create?.date ? formatDate(data.post.date_create.date) : ""}</span>
            </div>
            <div className="content">
                <div className="content-text" dangerouslySetInnerHTML={{ __html: data.post.content_full || "" }} />
                <div className="content-files">
                    {/* рендер файлов */}
                </div>
            </div>
        </motion.div>
    );
};
