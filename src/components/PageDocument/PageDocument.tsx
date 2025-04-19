import {FC} from "react";
import {pageAnimation} from "../../constants/motionSettings.ts";
import {motion} from "framer-motion";
import DocxViewer from "./DocxViewer/DocxViewer.tsx";
import {DocumentProgressConsistently} from "../DocumentProgressConsistently/DocumentProgressConsistently.tsx";

export const PageDocument: FC = () => {
    return(
        <motion.div {...pageAnimation} className={"page page-document"}>
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