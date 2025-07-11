import React, { FC } from "react";
import './DocumentCard.css'
import { motion } from "framer-motion";
import {pageAnimation} from "../../../../constants/motionSettings.ts";

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
                return { backgroundColor: 'var(--color-accent-50)', color: 'var(--color-accent-500)' };
            case "На редактировании":
                return { backgroundColor: '#fff3cd', color: '#856404' };
            case "В архиве":
                return { backgroundColor: 'var(--color-gray-50)', color: 'var(--color-gray-700)' };
            case "Отклонено":
                return { backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error-text)' };
            default:
                return { backgroundColor: 'var(--color-gray-50)', color: 'var(--color-gray-700)' };
        }
    };

    return (
        <motion.a
            {...pageAnimation}
            href={`documents/${id}`} className="widget-item test-card"
        >
            <div className="test-card__general">
                <div className="test-card__labels">
                    <span className="test-card__type">{type}</span>
                    <span className="test-card__status" style={getStatusStyle(status)}>{status}</span>
                </div>

                <span className="test-card__title">{title}</span>
            </div>

            <div className="test-card__info">
            </div>
        </motion.a>
    );
}
