import React, { FC } from "react";
import './DocumentCard.css'
import { motion } from "framer-motion";
import {pageAnimation} from "../../../../../constants/pageAnimation.ts";

interface IDocumentCardProps {
    id: number;
    title: string;
    status: string;
    signedDate: string | null;
    expiresDate: string | null;
    type: string;
    variety: string;
    partner: string;
    entity: string;
}

export const DocumentCard: FC<IDocumentCardProps> = ({
                                                         id,
                                                         title,
                                                         status,
                                                         type,
}) => {
    const getStatusStyle = (status: string): React.CSSProperties => {
        switch (status) {
            case "На согласовании":
                return { borderColor: 'var(--color-accent-50)', color: 'var(--color-accent-700)' };
            case "На редактировании":
                return { borderColor: '#fff3cd', color: '#856404' };
            case "В архиве":
                return { borderColor: 'var(--color-gray-100)', color: 'var(--color-gray-700)' };
            case "Отклонено":
                return { borderColor: 'var(--color-error-bg)', color: 'var(--color-error-text)' };
            default:
                return { borderColor: 'var(--color-gray-100)', color: 'var(--color-gray-700)' };
        }
    };

    return (
        <motion.a
            {...pageAnimation}
            href={`documents/${id}`} className="widget-item document-card grid-card"
        >
            <div className="document-card__general">
                <div className="document-card__labels">
                    <span className="document-card__type">{type}</span>
                    <span className="document-card__status" style={getStatusStyle(status)}>{status}</span>
                </div>

                <span className="document-card__title">{title}</span>
            </div>

            <div className="document-card__info">
            </div>
        </motion.a>
    );
}
