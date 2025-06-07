import { FC, useState } from "react";
import { Cross } from "../../Cross/Cross.tsx";
import { useModal } from "../../../store/hooks/useModal.ts";
import { Employee } from "../../../interfaces/IEmployee.ts";
import { useEditEmployee } from "../../Contexts/EditEmployeeContext/EditEmployeeContext.tsx";
import { UpdateUserCommand } from "../../../api/commands/IUpdateUserCommand.ts";
import { DropdownCheckbox } from "../../DropdownCheckbox/DropdownCheckbox.tsx";
import { useGetUserFunctionQuery } from "../../../api/methods/userFunctionApi.ts";
import {
    useGetUserHasUserFunctionIdsByIdUserQuery,
    useUpdateUserPermissionMutation
} from "../../../api/methods/userHasUserFunctionApi.ts";
import { useUpdateUserMutation } from "../../../api/methods/userApi.ts";
import { useHasPermission } from "../../../store/hooks/useHasPermission.ts";
import { Permissions } from "../../../constants/permissions.ts";

type ModalEditEmployeeProps = {
    employee: Employee;
}

export const ModalEditEmployee: FC<ModalEditEmployeeProps> = ({ employee }) => {
    const {closeModal} = useEditEmployee();
    const {isClosing, handleClose} = useModal(true, () => closeModal());

    const {data: allUserFunctions} = useGetUserFunctionQuery();
    const {data: selectedUserFunctions} = useGetUserHasUserFunctionIdsByIdUserQuery(
        {idUser: employee.id_user},
        {skip: !employee.id_user}
    );
    const canViewDropdown = useHasPermission(Permissions.Superuser);
    const [updateUserPermission, {isLoading: isUpdateUserPermissionLoading}] = useUpdateUserPermissionMutation();
    const [updateUser, {isLoading}] = useUpdateUserMutation();

    const [position] = useState<string>(employee?.position.title || "");
    const [department] = useState<string>(employee?.department.title || "");
    const [phone] = useState<string>(employee?.phone || "");
    const [email] = useState<string>(employee?.email || "");
    const [tempPosition, setTempPosition] = useState<string>(position);
    const [tempPhone, setTempPhone] = useState<string>(phone);
    const [tempEmail, setTempEmail] = useState<string>(email);
    const [selected, setSelected] = useState<number[]>([]);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const handleFunctionChanged = async (optionId: number) => {
        const isSelected = selected.includes(optionId);
        let newSelected: number[];

        if (isSelected) {
            newSelected = selected.filter(id => id !== optionId);
        } else {
            newSelected = [...selected, optionId];
        }

        // Устанавливаем loadingId
        setLoadingId(optionId);

        try {
            setSelected(newSelected);

            await updateUserPermission({
                id_user: employee.id_user,
                id_user_function: optionId
            }).unwrap();
        } catch (e) {
            console.error("Ошибка при обновлении прав пользователя:", e);
            setSelected(selected); // откат
        } finally {
            setLoadingId(null);
        }
    };

    const handleSave = async () => {
        const payload: UpdateUserCommand = {
            id_user: employee.id_user,
            position: tempPosition,
            email: tempEmail,
            phone: tempPhone
        };

        try {
            const response = await updateUser(payload).unwrap();
            console.log(response)
        } catch (error) {
            console.error("Ошибка при обновлении:", error);
        } finally {
            handleClose();
        }
    };

    return (
        <dialog className={`modal ${isClosing ? "modal--hidden" : ""}`} id="editEmployee" open>
            <div className={`modal__content ${isClosing ? "modal__content--hidden" : ""}`}>
                <div className="modal__header">
                    <span className="modal__title">Редактирование сотрудника</span>
                    <Cross onClick={handleClose} color="#000000"/>
                </div>
                <div className="modal__body">
                    <div className="employee-editor">
                        <div className="employee-editor__info">
                            <div className="employee-editor__fields">
                                <div className="employee-editor__main-fields">
                                    <div className="employee-editor__photo-container">
                                        <div
                                            className="employee-editor__photo"
                                            style={{backgroundImage: `url(https://newportal/files/images/${employee?.image.path})`}}
                                        ></div>
                                    </div>

                                    <span className="employee-editor__name">{employee?.surname} {employee?.name} {employee?.patronymic}</span>
                                </div>
                                <div className="employee-editor__additional-fields">
                                    <div className="employee-editor__field">
                                        <label className="employee-editor__label">Почтовый адрес</label>
                                        <input
                                            className="employee-editor__input styled"
                                            type="text"
                                            placeholder={email}
                                            onChange={(e) => setTempEmail(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="employee-editor__field">
                                        <label className="employee-editor__label">Должность</label>
                                        <input
                                            className="employee-editor__input styled"
                                            type="text"
                                            placeholder={position}
                                            onChange={(e) => setTempPosition(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="employee-editor__field">
                                        <label className="employee-editor__label">Город</label>
                                        <input
                                            className="employee-editor__input styled"
                                            type="text"
                                            placeholder={employee.department.city.title}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="employee-editor__field">
                                        <label className="employee-editor__label">Подразделение</label>
                                        <input
                                            className="employee-editor__input styled"
                                            type="text"
                                            placeholder={department}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="employee-editor__field">
                                        <label className="employee-editor__label">Контактный телефон</label>
                                        <input
                                            className="employee-editor__input styled"
                                            type="text"
                                            placeholder={phone}
                                            onChange={(e) => setTempPhone(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {allUserFunctions && canViewDropdown && (
                                        <DropdownCheckbox
                                            options={allUserFunctions.functions.map(item => ({
                                                id: item.id_user_function,
                                                title: item.title,
                                            }))}
                                            selectedValues={selectedUserFunctions ? selectedUserFunctions.functions : []}
                                            onChange={handleFunctionChanged}
                                            placeholder="Права и возможности"
                                            areVariantsDisabled={isUpdateUserPermissionLoading}
                                            loadingId={loadingId}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal__actions">
                    <button className="modal__action modal__action--save primary" onClick={handleSave}
                            disabled={isLoading}>
                        Сохранить
                        {isLoading && (
                            <div className={"shimmer"}></div>
                        )}
                    </button>
                    <button className="modal__action modal__action--cancel secondary" onClick={handleClose}
                            disabled={isLoading}>
                        Отмена
                    </button>
                </div>
            </div>

            <div className={`modal__overlay ${isClosing ? "modal__overlay--hidden" : ""}`} onClick={handleClose}></div>
        </dialog>
    );
}
