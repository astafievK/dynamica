import { FC, useState } from "react";
import { Dropdown } from "../../../Dropdown/Dropdown.tsx";
import { ModalUserNotification } from "../../../Modals/ModalUserNotification/ModalUserNotification.tsx";
import { Department } from "../../../../api/interfaces/IDepartment.ts";
import {useEditDepartmentTitleMutation} from "../../../../api/methods/departmentApi.ts";

interface AssociationProps {
    optionsCity: { id_city: number, title: string }[],
    optionsDivision: { id_division: number, title: string }[],
    optionsOrganization: { id_organization: number, title: string }[],
    department: Department,
}

export const Association: FC<AssociationProps> = (props) => {
    const [departmentTitle, setDepartmentTitle] = useState<string | null>(props.department.title);
    const [notification, setNotification] = useState<{ title?: string; message: string } | null>(null);
    const [isSaveLocked, setIsSaveLocked] = useState<boolean>(true);

    const [editDepartmentTitle, { isLoading }] = useEditDepartmentTitleMutation();

    const handleSave = async () => {
        const newTitle = departmentTitle?.trim() === "" ? null : departmentTitle;

        if (newTitle !== props.department.title) {
            try {
                const response = await editDepartmentTitle({
                    id_department: props.department.id_department,
                    title: newTitle,
                }).unwrap();
                setNotification({ title: "Обновление отдела", message: response.message });
            } catch (error) {
                console.log(error);
                setNotification({ title: "Обновление отдела", message: "Не удалось изменить название отдела" });
            }
        }
    };

    return (
        <>
            {notification && (
                <ModalUserNotification
                    title={notification.title}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className={`association`}>
                <div className="variants">
                    <Dropdown
                        options={props.optionsCity.map(({ id_city, title }) => ({ id: id_city, title }))}
                        label="Город"
                        value={{ id: props.department.city.id_city, title: props.department.city.title }}
                        isDisabled={true}
                    />
                    <Dropdown
                        options={props.optionsDivision.map(({ id_division, title }) => ({ id: id_division, title }))}
                        label="Подразделение"
                        value={{ id: props.department.division.id_division, title: props.department.division.title }}
                        isDisabled={true}
                    />
                    <Dropdown
                        options={props.optionsOrganization.map(({ id_organization, title }) => ({ id: id_organization, title }))}
                        label="Организация"
                        value={{ id: props.department.organization.id_organization, title: props.department.organization.title }}
                        isDisabled={true}
                    />
                </div>
                <div className="arrow-container">
                    <img className="arrow" src="/arrow.svg" alt="" />
                </div>
                <div className="result">
                    <input
                        type="text"
                        className="result-field styled"
                        placeholder="Отдел"
                        value={departmentTitle ?? ""}
                        onChange={(e) => {
                            setDepartmentTitle(e.target.value)
                            setIsSaveLocked(e.target.value === props.department.title)
                        }}
                    />
                </div>
                <div className="actions-container">
                    <button className="action save" onClick={handleSave} disabled={isLoading || isSaveLocked}>
                        <img src="/save.svg" alt="Сохранить" />
                        {isLoading && <span className="shimmer"></span>}
                    </button>
                    {
                        //<button className="action delete"><img src="/trash.svg" alt="Удалить"/></button>
                    }
                </div>
            </div>
        </>
    );
};
