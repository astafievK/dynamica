import {FC} from "react";
import {pageAnimation} from "../../constants/pageAnimation.ts";
import {motion} from "framer-motion";
import "./PageDocument.css";
import {SignersContainer} from "./SignersContainer/SignersContainer.tsx";
import {CommentsContainer} from "./CommentsContainer/CommentsContainer.tsx";
import Button from "../Buttons/Button/Button.tsx";

export const PageDocument: FC = () => {
    return(
        <motion.div {...pageAnimation} className={"page page-document"}>
            <div className="page-header">
                <div className="page-header__actions">
                    <Button
                        className={"page-header__action page-header__action-signers"}
                        variant={"secondary"}
                    >
                        Согласующие
                    </Button>
                    <Button
                        className={"page-header__action page-header__action-comments"}
                        variant={"secondary"}
                    >
                        Комментарии
                    </Button>
                </div>
            </div>
            <div className="page-content">
                <div className="page-content-item">
                    <div className="document-info">
                        <SignersContainer/>
                        <CommentsContainer/>
                    </div>
                    <iframe
                        className={"document"}
                        src="/test.pdf#navpanes=0&scrollbar=0"
                    />
                </div>
            </div>
        </motion.div>
    )
}