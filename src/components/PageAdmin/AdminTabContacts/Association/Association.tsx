import { FC, useState } from "react";
import { ModalUserNotification } from "../../../Modals/ModalUserNotification/ModalUserNotification.tsx";
import { Department } from "../../../../api/interfaces/IDepartment.ts";
import {useEditDepartmentTitleMutation} from "../../../../api/methods/departmentApi.ts";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

interface AssociationProps {
    department: Department
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
                    <div className="variant">
                        <span className={"variant-title"}>{props.department.city.title}</span>
                    </div>
                    <div className="variant">
                        <span className={"variant-title"}>{props.department.division.title}</span>
                    </div>
                    <div className="variant">
                        <span className={"variant-title"}>{props.department.organization.title}</span>
                    </div>
                </div>
                <div className="arrow-container">
                    <img className="arrow" src="/arrow.svg" alt=""/>
                </div>
                <div className="result">
                    <input
                        type="text"
                        className="result-field styled"
                        placeholder="Отдел"
                        name={"department_name"}
                        value={departmentTitle ?? ""}
                        disabled={isLoading}
                        onChange={(e) => {
                            setDepartmentTitle(e.target.value)
                            setIsSaveLocked(e.target.value === props.department.title)
                        }}
                    />
                </div>
                <div className="actions-container">
                    <button className="action save" onClick={handleSave} disabled={isLoading || isSaveLocked}>
                        <SaveRoundedIcon />
                        {isLoading && <span className="shimmer"></span>}
                    </button>
                </div>
            </div>
        </>
    );
};
