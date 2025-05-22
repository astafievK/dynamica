import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import {ModalEditEmployee} from "../../Modals/ModalEditEmployee/ModalEditEmployee.tsx";
import {EditEmployeeModalContextType} from "../../../interfaces/EditEmployeeModalContextType.ts";
import {Employee} from "../../../interfaces/IEmployee.ts";

const ModalContext = createContext<EditEmployeeModalContextType | null>(null);

export const useEditEmployee = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within a EditEmployeeProvider");
    return context;
};

export const EditEmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [employee, setEmployee] = useState<Employee | null>(null);

    const openModal = (employee: Employee) => {
        setEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEmployee(null);
    };

    const modalRoot = document.getElementById("modal-root");

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalRoot && isModalOpen && employee &&
                ReactDOM.createPortal(
                    <ModalEditEmployee employee={employee} />,
                    modalRoot
                )}
        </ModalContext.Provider>
    );
};
