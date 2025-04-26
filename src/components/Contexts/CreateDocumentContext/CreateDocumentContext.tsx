import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import {ModalCreateDocument} from "../../Modals/ModalCreateDocument/ModalCreateDocument.tsx";

interface ModalContextType {
    openModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useCreateDocument = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within a CreateDocumentProvider");
    return context;
};

export const CreateDocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalRoot = document.getElementById("modal-root");

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalRoot && isModalOpen &&
                ReactDOM.createPortal(
                    <ModalCreateDocument/>,
                    modalRoot
                )}
        </ModalContext.Provider>
    );
};
