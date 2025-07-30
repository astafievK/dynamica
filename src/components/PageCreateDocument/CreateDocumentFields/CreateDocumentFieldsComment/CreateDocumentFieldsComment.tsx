import React, {FC, useEffect, useRef, useState} from "react";
import {DocumentFiles} from "./DocumentFilesGrid/DocumentFiles.tsx";
import "./CreateDocumentFieldsComment.css"
import "../CreateDocumentFields.css"

interface ICreateDocumentFieldsCommentProps extends React.HTMLAttributes<HTMLDivElement> {
    activeDraftId: number
}

export const CreateDocumentFieldsComment: FC<ICreateDocumentFieldsCommentProps> = ({ activeDraftId, ...rest }) => {
    const [description, setDescription] = useState<string | null>(null);

    const textareaDescriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setDescription(null)
    }, [activeDraftId]);

    return (
        <div {...rest}>
            <div className="fields-block">
                <span className="fields-block__title">Описание договора (опционально)</span>
                <div className="fields-block__fields">
                    <textarea
                        className="styled"
                        placeholder="Описание"
                        id="draftDescriptionTextarea"
                        name="draft_description"
                        value={description ?? ''}
                        ref={textareaDescriptionRef}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
            <div className="fields-block">
                <span className="fields-block__title">Вложения</span>
                <div className="fields-block__fields">
                    <DocumentFiles/>
                </div>
            </div>
        </div>
    );
};