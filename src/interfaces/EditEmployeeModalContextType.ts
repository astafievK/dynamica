import {Employee} from "./IEmployee.ts";

export interface EditEmployeeModalContextType {
    openModal: (employee: Employee) => void;
    closeModal: () => void;
}