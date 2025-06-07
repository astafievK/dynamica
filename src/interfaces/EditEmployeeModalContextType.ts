import {Employee} from "./IEmployee";

export interface EditEmployeeModalContextType {
    openModal: (employee: Employee) => void;
    closeModal: () => void;
}