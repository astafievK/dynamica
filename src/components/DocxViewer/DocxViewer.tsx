import React, { useRef, useEffect } from 'react';
import { renderAsync } from 'docx-preview';
import "./DocxViewer.css";

interface DocxViewerProps {
    fileUrl: string;
    classNames?: string[]
}

const DocxViewer: React.FC<DocxViewerProps> = ({ fileUrl, classNames = [] }) => {
    const viewerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadDocxFile = async () => {
            try {
                const response = await fetch(fileUrl);
                const arrayBuffer = await response.arrayBuffer();
                if (viewerRef.current) {
                    await renderAsync(arrayBuffer, viewerRef.current);
                }
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        };

        loadDocxFile();
    }, [fileUrl]);

    return (
        <div ref={viewerRef} className={`docx-container ${classNames}`}></div>
    );
};

export default DocxViewer;
