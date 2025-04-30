import { FC, useRef, useState } from "react";
import { Cross } from "../../Cross/Cross.tsx";
import { useModal } from "../../../store/hooks/useModal.ts";
import { Employee } from "../../../interfaces/IEmployee.ts";
import { formatDateForLabel } from "../../../constants/functions.ts";
import {useEditEmployee} from "../../Contexts/EditEmployeeContext/EditEmployeeContext.tsx";

interface ModalEditEmployeeProps {
    employee: Employee | null;
}

export const ModalEditEmployee: FC<ModalEditEmployeeProps> = ({ employee }) => {
    const { closeModal } = useEditEmployee();
    const { isClosing, handleClose } = useModal(true, () => closeModal());

    const [name, setName] = useState<string>(employee?.name || "");
    const [surname, setSurname] = useState<string>(employee?.surname || "");
    const [patronymic, setPatronymic] = useState<string>(employee?.patronymic || "");
    const [position, setPosition] = useState<string>(employee?.position.title || "");
    const [city] = useState<string>(employee?.department.city.title || "");
    const [department, setDepartment] = useState<string>(employee?.department.title || "");
    const [phone, setPhone] = useState<string>(employee?.phone || "");
    const [birthday, setBirthday] = useState<string>(employee?.birthday.date || "");

    const birthdayInputRef = useRef<HTMLInputElement>(null);

    const openStartDate = () => {
        birthdayInputRef.current?.showPicker?.();
        birthdayInputRef.current?.focus();
    };

    const handleSave = () => {
        const updatedEmployee = {
            ...employee,
            name,
            surname,
            patronymic,
            position: { ...employee!.position, title: position },
            department: { ...employee!.department, title: department },
            phone,
            birthday: { ...employee!.birthday, date: birthday }
        };
        console.log("Сохранение сотрудника:", updatedEmployee);
        closeModal();
    };

    return (
        <dialog className={`modal ${isClosing ? "hidden" : ""}`} id="editEmployee" open>
            <div className={`modal-content ${isClosing ? "hidden" : ""}`}>
                <div className="modal-content__header">
                    <span className="modal-title">
                        Редактирование сотрудника • {employee?.surname} {employee?.name} {employee?.patronymic}
                    </span>
                    <Cross onClick={handleClose} color="#000000" />
                </div>
                <div className="modal-content__body">
                    <div className="fields">
                        <div className="fields-main">
                            <div className="fields-title">Основная информация</div>
                            <div className="fields-content">
                                <div
                                    className="employee-photo"
                                    style={{ backgroundImage: `url(https://192.168.7.74/files/images/${employee?.image.path})` }}
                                ></div>
                                <div className="fields-main-fullname">
                                    <input
                                        className="styled"
                                        type="text"
                                        placeholder="Фамилия"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                    />
                                    <input
                                        className="styled"
                                        type="text"
                                        placeholder="Имя"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        className="styled"
                                        type="text"
                                        placeholder="Отчество"
                                        value={patronymic}
                                        onChange={(e) => setPatronymic(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="fields-info">
                            <div className="fields-title">Дополнительная информация</div>
                            <div className="fields-content">
                                <input
                                    className="styled"
                                    type="text"
                                    placeholder="Должность"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                                <input
                                    className="styled"
                                    type="text"
                                    placeholder="Город"
                                    value={city}
                                    disabled
                                />
                                <input
                                    className="styled"
                                    type="text"
                                    placeholder="Подразделение"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                                <input
                                    className="styled"
                                    type="text"
                                    placeholder="Номер телефона"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <div className="input-birthday">
                                    <label htmlFor="editEmployeeBirthday" onClick={openStartDate}>
                                        {formatDateForLabel(birthday)}
                                    </label>
                                    <input
                                        type="date"
                                        id="editEmployeeBirthday"
                                        ref={birthdayInputRef}
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <button className="action save" onClick={handleSave}>Сохранить</button>
                        <button className="action cancel" onClick={handleClose}>Отмена</button>
                    </div>
                </div>
            </div>
            <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
        </dialog>
    );
};
