import {FC, useEffect} from "react";
import {pageAnimation} from "../../motionSettins.ts";
import {motion} from "framer-motion";
import DocxViewer from "./DocxViewer/DocxViewer.tsx";
import {DocumentProgressConsistently} from "../DocumentProgressConsistently/DocumentProgressConsistently.tsx";

export const PageDocument: FC = () => {
    useEffect(() => {
        document.title = "Статус документа";
    })

    return(
        <motion.div
            initial={pageAnimation.initial}
            animate={pageAnimation.animate}
            exit={pageAnimation.exit}
            transition={pageAnimation.transition}
            className={"page page-document"}
        >
            <div className="content">
                {
                    // <DocumentProgressParallel/>
                }
                <DocumentProgressConsistently/>
                <DocxViewer fileUrl="/test.docx"/>
            </div>
        </motion.div>
    )
}