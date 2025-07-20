import {FC} from "react";
import {pageAnimation} from "../../constants/pageAnimation.ts";
import {motion} from "framer-motion";
import DocxViewer from "../DocxViewer/DocxViewer.tsx";
import "./PageDocument.css";
import {SignersContainer} from "./SignersContainer/SignersContainer.tsx";
import {CommentsContainer} from "./CommentsContainer/CommentsContainer.tsx";

export const PageDocument: FC = () => {
    return(
        <motion.div {...pageAnimation} className={"page page-document"}>
            <div className="page-content">
                <SignersContainer/>
                <DocxViewer fileUrl="/test.docx" classNames={["document-container"]}/>
                <CommentsContainer/>
            </div>
        </motion.div>
    )
}