import { FC, useState } from "react";
import { Cross } from "../../Cross/Cross.tsx";
import { useModal } from "../../../store/hooks/useModal.ts";
import { IUser } from "../../../interfaces/IUser.ts";
import { useEditEmployee } from "../../Contexts/EditEmployeeContext/EditEmployeeContext.tsx";
import { UpdateUserCommand } from "../../../api/commands/IUpdateUserCommand.ts";
import { DropdownCheckbox } from "../../CustomComponents/DropdownCheckbox/DropdownCheckbox.tsx";
import { useGetPermissionQuery } from "../../../api/methods/permissionApi.ts";
import {
    useGetUserHasPermissionIdsByIdUserQuery,
    useUpdateUserPermissionMutation
} from "../../../api/methods/userHasPermissionApi.ts";
import { useUpdateUserMutation } from "../../../api/methods/userApi.ts";
import { useHasPermission } from "../../../store/hooks/useHasPermission.ts";
import { Permissions } from "../../../constants/permissions.ts";
import Button from "../../Buttons/Button/Button.tsx";

type ModalEditEmployeeProps = {
    employee: IUser;
}

export const ModalEditEmployee: FC<ModalEditEmployeeProps> = ({ employee }) => {
    const {closeModal} = useEditEmployee();
    const {isClosing, handleClose} = useModal(true, () => closeModal());

    const {data: allPermissions} = useGetPermissionQuery();
    const {data: selectedUserPermissions} = useGetUserHasPermissionIdsByIdUserQuery(
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

    const handlePermissionChanged = async (optionId: number) => {
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
            // Ждем успешного обновления на сервере
            await updateUserPermission({
                id_user: employee.id_user,
                id_permission: optionId,
            }).unwrap();

            // Только после успеха обновляем локальный стейт
            setSelected(newSelected);
        } catch (e) {
            console.error("Ошибка при обновлении прав пользователя:", e);
            // Не меняем selected, оставляем прежнее состояние (откат)
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
            await updateUser(payload).unwrap();
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
                                    {allPermissions && canViewDropdown && (
                                        <DropdownCheckbox
                                            options={allPermissions.permissions.map(item => ({
                                                id: item.id_permission,
                                                title: item.title,
                                            }))}
                                            selectedValues={selectedUserPermissions ? selectedUserPermissions.permissions : []}
                                            onChange={handlePermissionChanged}
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
                    <Button
                        variant={"action"}
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        Сохранить
                        {isLoading && (
                            <div className={"shimmer"}></div>
                        )}
                    </Button>
                    <Button
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Отмена
                    </Button>
                </div>
            </div>

            <div className={`modal__overlay ${isClosing ? "modal__overlay--hidden" : ""}`} onClick={handleClose}></div>
        </dialog>
    );
}
