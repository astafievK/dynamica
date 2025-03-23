import {FC, useEffect} from "react";
import {pageAnimation} from "../../constants/motionSettins.ts";
import {motion} from "framer-motion";
import DocxViewer from "./DocxViewer/DocxViewer.tsx";
import {DocumentProgressConsistently} from "../DocumentProgressConsistently/DocumentProgressConsistently.tsx";

export const PageDocument: FC = () => {
    useEffect(() => {
        document.title = "Статус документа";
    })

    return(
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
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