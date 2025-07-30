import { FC } from "react";
import {useEditEmployee} from "../../../Contexts/EditEmployeeContext/EditEmployeeContext.tsx";
import {useModal} from "../../../../store/hooks/useModal.ts";
import {Cross} from "../../../Cross/Cross.tsx";

const ModalDocumentComments: FC = () => {
    const {closeModal} = useEditEmployee();
    const {isClosing, handleClose} = useModal(true, () => closeModal());

    return (
        <div role={"dialog"} className={`modal ${isClosing ? "modal--hidden" : ""}`} id="modal-document-comments">
            <div className="modal__header">
                <span className="modal__title">Редактирование сотрудника</span>
                <Cross onClick={handleClose} color="#000000"/>
            </div>
            <div className="modal__body">

            </div>
            <div className={`modal__overlay ${isClosing ? "modal__overlay--hidden" : ""}`} onClick={handleClose}></div>
        </div>
    )
}

export default ModalDocumentComments;