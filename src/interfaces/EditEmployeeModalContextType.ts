import {IUser} from "./IUser";

export interface EditEmployeeModalContextType {
    openModal: (employee: IUser) => void;
    closeModal: () => void;
}