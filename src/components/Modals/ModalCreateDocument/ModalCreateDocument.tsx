import { FC } from "react";
import { Cross } from "../../Cross/Cross.tsx";
import { useModal } from "../../../store/hooks/useModal.ts";
import { useCreateDocument } from "../../Contexts/CreateDocumentContext/CreateDocumentContext.tsx";
import {Dropdown} from "../../Dropdown/Dropdown.tsx";

const documentTypes = [
    { id: 1, title: 'Параллельный' },
    { id: 2, title: 'Последовательный' }
];

const dealershipLocations = [
    { id: 1, title: 'Архангельск' },
    { id: 2, title: 'Череповец' },
    { id: 3, title: 'Вологда' },
    { id: 4, title: 'Калининград' },
]

const reconciliators = [
    { id: 1, title: 'какой-то пункт 1' },
    { id: 2, title: 'какой-то пункт 2' },
    { id: 3, title: 'какой-то пункт 3' },
    { id: 4, title: 'какой-то пункт 4' },
]

export const ModalCreateDocument: FC = () => {
    const { closeModal } = useCreateDocument();

    const { isClosing, handleClose } = useModal(true, () => closeModal());

    return (
        <dialog className={`modal ${isClosing ? "hidden" : ""}`} id="createDocument" open>
            <div className={`modal-content modal-create-document ${isClosing ? "hidden" : ""}`}>
                <div className="modal-content__header">
                    <span className="modal-title">Создание документа</span>
                    <Cross onClick={handleClose} color="#000000" />
                </div>
                <div className="modal-content__body">
                    <Dropdown options={documentTypes} label={'Вид договора'} value={documentTypes[0]}/>
                    <Dropdown options={dealershipLocations} label={'Город расположение ДЦ'} value={dealershipLocations[0]}/>
                    <Dropdown options={reconciliators} label={'Согласующие'} value={reconciliators[0]}/>
                </div>
            </div>
            <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
        </dialog>
    );
};
