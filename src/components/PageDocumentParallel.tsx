import {FC, useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {pageAnimation} from "../motionSettins.ts";
import DocxViewer from "./PageDocument/DocxViewer/DocxViewer.tsx";
import {DocumentProgressParallel} from "./DocumentProgressParallel/DocumentProgressParallel.tsx";

export const PageDocumentParallel: FC = () => {
    useEffect(() => {
        document.title = "Статус документа";
    })

    return(
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={pageAnimation.transition}
                className={"page page-document"}
            >
                <div className="content">
                    <DocumentProgressParallel/>
                    <DocxViewer fileUrl="/test.docx"/>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}