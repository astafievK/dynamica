import { FC, useState } from "react";
import { Cross } from "../../Cross/Cross.tsx";
import { useModal } from "../../../store/hooks/useModal.ts";
import { Employee } from "../../../interfaces/IEmployee.ts";
import {useEditEmployee} from "../../Contexts/EditEmployeeContext/EditEmployeeContext.tsx";
import {UpdateUserCommand} from "../../../api/commands/IUpdateUserCommand.ts";
import {DropdownCheckbox} from "../../DropdownCheckbox/DropdownCheckbox.tsx";

type ModalEditEmployeeProps = {
    employee: Employee;
}

const options = [
    { label: 'Разработка', value: 'dev' },
    { label: 'Дизайн', value: 'design' },
    { label: 'Маркетинг', value: 'marketing' },
];

export const ModalEditEmployee: FC<ModalEditEmployeeProps> = ({ employee }) => {
    const { closeModal } = useEditEmployee();
    const { isClosing, handleClose } = useModal(true, () => closeModal());

    const [position] = useState<string>(employee?.position.title || "");
    const [department] = useState<string>(employee?.department.title || "");
    const [phone] = useState<string>(employee?.phone || "");
    const [tempPosition, setTempPosition] = useState<string>(position);
    const [tempDepartment, setTempDepartment] = useState<string>(department);
    const [tempPhone, setTempPhone] = useState<string>(phone);
    const [selected, setSelected] = useState<string[]>([]);

    const handleSave = () => {
        const payload: UpdateUserCommand = {
            id_user: employee.id_user,
        };

        if (tempPosition !== position) {
            payload.position_title = tempPosition.trim() === "" ? null : tempPosition.trim();
        }

        if (tempDepartment !== department) {
            payload.department_title = tempDepartment.trim() === "" ? null : tempDepartment.trim();
        }

        if (tempPhone !== phone) {
            payload.phone = tempPhone.trim() === "" ? null : tempPhone.trim();
        }

        const hasChanges = Object.keys(payload).some(key => key !== "id_user");

        if (!hasChanges) {
            console.log("Нет изменений");
            closeModal();
            return;
        }

        console.log("Изменённые поля:", payload);

        // updateEmployee(payload);

        closeModal();
    };

    return (
        <dialog className={`modal ${isClosing ? "modal--hidden" : ""}`} id="editEmployee" open>
            <div className={`modal__content ${isClosing ? "modal__content--hidden" : ""}`}>
                <div className="modal__header">
                    <span className="modal__title">Редактирование сотрудника</span>
                    <Cross onClick={handleClose} color="#000000" />
                </div>
                <div className="modal__body">
                    <div className="employee-editor">
                        <div className="employee-editor__info">
                            <div className="employee-editor__fields">
                                <div className="employee-editor__main-fields">
                                    <div className="employee-editor__photo-container">
                                        <div
                                            className="employee-editor__photo"
                                            style={{ backgroundImage: `url(https://newportal/files/images/${employee?.image.path})` }}
                                        ></div>
                                    </div>

                                    <span className="employee-editor__name">{employee?.surname} {employee?.name} {employee?.patronymic}</span>
                                </div>
                                <div className="employee-editor__additional-fields">
                                    <div className="employee-editor__field">
                                        <label className="employee-editor__label">Должность</label>
                                        <input
                                            className="employee-editor__input styled"
                                            type="text"
                                            placeholder={employee?.position.title}
                                            onChange={(e) => setTempPosition(e.target.value)}
                                        />
                                    </div>
                                    <div className="employee-editor__field">
                                        <label className="employee-editor__label">Город</label>
                                        <input
                                            className="employee-editor__input styled"
                                            type="text"
                                            placeholder={employee?.department.city.title}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="employee-editor__field">
                                        <label className="employee-editor__label">Подразделение</label>
                                        <input
                                            className="employee-editor__input styled"
                                            type="text"
                                            placeholder={employee!.department.title!}
                                            onChange={(e) => setTempDepartment(e.target.value)}
                                        />
                                    </div>
                                    <div className="employee-editor__field">
                                        <label className="employee-editor__label">Контактный телефон</label>
                                        <input
                                            className="employee-editor__input styled"
                                            type="text"
                                            placeholder={employee?.phone}
                                            onChange={(e) => setTempPhone(e.target.value)}
                                        />
                                    </div>
                                    <DropdownCheckbox
                                        options={options}
                                        selectedValues={selected}
                                        onChange={setSelected}
                                        placeholder="Права и возможности"
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            /*
                        <div className="employee-editor__functions">
                            <div className="employee-editor__functions-title">Возможности</div>
                            <div className="employee-editor__functions-list">
                                {[...Array(22)].map((_, index) => (
                                    <div className="employee-editor__function" key={index}>
                                        <button className={`employee-editor__function-btn ${index === 1 ? 'employee-editor__function-btn--selected' : ''}`}>
                                            Название функции сотрудника
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                             */
                        }
                    </div>
                </div>
                <div className="modal__actions">
                    <button className="modal__action modal__action--save primary" onClick={handleSave}>Сохранить</button>
                    <button className="modal__action modal__action--cancel secondary" onClick={handleSave}>Отмена</button>
                </div>
            </div>

            <div className={`modal__overlay ${isClosing ? "modal__overlay--hidden" : ""}`} onClick={handleClose}></div>
        </dialog>
    );
};
