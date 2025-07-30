import React, {FC, useEffect, useRef, useState} from "react";
import {DraftFilesList} from "./DraftFilesList/DraftFilesList.tsx";
import "./DraftFieldsComment.css"
import "../DraftFields.css"

interface ICreateDocumentFieldsCommentProps extends React.HTMLAttributes<HTMLDivElement> {
    activeDraftId: number
}

export const DraftFieldsComment: FC<ICreateDocumentFieldsCommentProps> = ({ activeDraftId, ...rest }) => {
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
                    <DraftFilesList/>
                </div>
            </div>
        </div>
    );
};