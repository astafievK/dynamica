import {FC, useRef, useState} from "react";
import { Cross } from "../../Cross/Cross.tsx";
import { useModal } from "../../../store/hooks/useModal.ts";
import { useCreateDocument } from "../../Contexts/CreateDocumentContext/CreateDocumentContext.tsx";
import {Dropdown} from "../../Dropdown/Dropdown.tsx";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

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

const approvers = [
    { id: 1, title: 'какой-то пункт 1' },
    { id: 2, title: 'какой-то пункт 2' },
    { id: 3, title: 'какой-то пункт 3' },
    { id: 4, title: 'какой-то пункт 4' },
]

const serviceTypes = [
    { id: 1, title: 'какой-то пункт 1' },
    { id: 2, title: 'какой-то пункт 2' },
    { id: 3, title: 'какой-то пункт 3' },
    { id: 4, title: 'какой-то пункт 4' },
]

export const ModalCreateDocument: FC = () => {
    const { closeModal } = useCreateDocument();
    const { isClosing, handleClose } = useModal(true, () => closeModal());
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [documentType, setDocumentType] = useState<{id: number, title: string}>(documentTypes[0])
    const [dealershipLocation, setDealershipLocation] = useState<{id: number, title: string}>(dealershipLocations[0])
    const [reconciliator, setReconciliator] = useState<{id: number, title: string}>(reconciliators[0])
    const [approver, setApprover] = useState<{id: number, title: string}>(approvers[0])
    const [serviceType, setServiceType] = useState<{id: number, title: string}>(serviceTypes[0])

    console.log(documentType)
    console.log(dealershipLocation)
    console.log(reconciliator)
    console.log(approver)
    console.log(serviceType)

    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);

    const openStartDate = () => {
        startInputRef.current?.showPicker?.();
        startInputRef.current?.focus();
    };

    const openEndDate = () => {
        endInputRef.current?.showPicker?.();
        endInputRef.current?.focus();
    };

    return (
        <dialog className={`modal ${isClosing ? "hidden" : ""}`} id="createDocument" open>
            <div className={`modal-content ${isClosing ? "hidden" : ""}`}>
                <div className="modal-content__header">
                    <span className="modal-title">Создание договора</span>
                    <Cross onClick={handleClose} color="#000000" />
                </div>
                <div className="modal-content__body">
                    <div className="upload-container">
                        <label htmlFor="createDocumentFileUploadInput" id="createDocumentFileUploadLabel">
                            <FileUploadOutlinedIcon/>
                            Загрузить договор
                        </label>
                        <input id="createDocumentFileUploadInput" type="file" required={true}/>
                    </div>
                    <div className="fields-container">
                        <div className="fields-primary">
                            <div className="field">
                                <span className="field-title">Вид договора</span>
                                <Dropdown options={documentTypes} label={'Вид договора'} value={documentTypes[0]} onSelect={setDocumentType}/>
                            </div>
                            <div className="field">
                                <span className="field-title">Город расположение ДЦ</span>
                                <Dropdown options={dealershipLocations} label={'Город расположение ДЦ'} value={dealershipLocations[0]} onSelect={setDealershipLocation}/>
                            </div>
                            <div className="field">
                                <span className="field-title">Согласующие</span>
                                <Dropdown options={reconciliators} label={'Согласующие'} value={approvers[0]} onSelect={setApprover}/>
                            </div>
                            <div className="field">
                                <span className="field-title">Юр. лицо Автохолдинга</span>
                                <Dropdown options={reconciliators} label={'Юр. лицо Автохолдинга'} value={reconciliators[0]} onSelect={setReconciliator}/>
                            </div>
                            <div className="field">
                                <span className="field-title">Сторонний контрагент</span>
                                <input className="styled" type="text" placeholder="Контрагент" />
                            </div>
                            <div className="field task-duration">
                                <span className="field-title">Сроки подписания</span>
                                <div className="calendars">
                                    <div className="calendar">
                                        <label
                                            htmlFor="createDocumentDurationStart"
                                            onClick={openStartDate}
                                        >
                                            {startDate || "С"}
                                        </label>
                                        <input
                                            type="date"
                                            id="createDocumentDurationStart"
                                            ref={startInputRef}
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <ArrowForwardOutlinedIcon />
                                    <div className="calendar">
                                        <label
                                            htmlFor="createDocumentDurationFinish"
                                            onClick={openEndDate}
                                        >
                                            {endDate || "До"}
                                        </label>
                                        <input
                                            type="date"
                                            id="createDocumentDurationFinish"
                                            ref={endInputRef}
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <span className="field-title">Вид услуги</span>
                                <Dropdown options={documentTypes} label={'Вид услуги'} value={serviceTypes[0]} onSelect={setServiceType}/>
                            </div>
                        </div>
                        <div className="field field-comment">
                            <span className="field-title">Комментарий</span>
                            <textarea className="styled" placeholder="Комментарий" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
        </dialog>
    );
};
