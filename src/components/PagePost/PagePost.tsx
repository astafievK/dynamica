import { FC, useEffect } from "react";
import { pageAnimation } from "../../constants/pageAnimation.ts";
import { motion } from "framer-motion";
import { useGetPostQuery } from "../../api/methods/postApi.ts";
import { useParams } from "react-router-dom";
import { formatDatetime } from "../../constants/functions.ts";
import { PageNotFound } from "../PageNotFound/PageNotFound.tsx";
import "./PagePost.css"

export const PagePost: FC = () => {
    const { idPost } = useParams();
    const { data } = useGetPostQuery({ id_post: Number(idPost) });

    useEffect(() => {
        if (data?.post) {
            document.title = data.post.title;
        }
    }, [data]);

    if (!data?.post) {
        return <PageNotFound />;
    }

    return (
        <motion.div {...pageAnimation} className={"page page-post"}>
            <div className="page-header">
                <span className="page-title">{data.post.title}</span>
                <span className="date">{data.post.date.date ? formatDatetime(data.post.date.date) : ""}</span>
            </div>
            <div className="page-content">
                <div className="content-text page-content-item" dangerouslySetInnerHTML={{ __html: data.post.description || "" }} />
                {
                    /*
                        <div className="content-files page-content-item"><span>123</span></div>
                     */
                }
            </div>
        </motion.div>
    );
};
