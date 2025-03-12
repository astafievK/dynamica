import { FC, useState } from "react";
import {Dropdown} from "../../../Dropdown/Dropdown.tsx";

interface AssociationProps {
    optionsCity: {id_city: number, title: string}[],
    optionsDivision: {id_division: number, title: string}[],
    optionsOrganization: {id_organization: number, title: string}[],
    department: string
    isCreatForm: boolean,
}

export const Association: FC<AssociationProps> = (props) => {
    const [city, setCity] = useState<{id: number | null, title: string | null}>({id: null, title: null});
    const [division, setDivision] = useState<{id: number | null, title: string | null}>({id: null, title: null});
    const [organization, setOrganization] = useState<{id: number | null, title: string | null}>({id: null, title: null});
    const [department, setDepartment] = useState<string>(props.department)

    return (
        <div className={`association ${props.isCreatForm && 'association-add'}`}>
            <div className="variants">
                <Dropdown
                    options={props.optionsCity.map(({ id_city, title }) => ({ id: id_city, title }))}
                    label="Город"
                    onSelect={setCity}
                />
                <Dropdown
                    options={props.optionsDivision.map(({ id_division, title }) => ({ id: id_division, title }))}
                    label="Подразделение"
                    onSelect={setDivision}
                />
                <Dropdown
                    options={props.optionsOrganization.map(({ id_organization, title }) => ({ id: id_organization, title }))}
                    label="Организация"
                    onSelect={setOrganization}
                />
            </div>
            <div className="arrow-container">
                <img className="arrow" src="/arrow.svg" alt=""/>
            </div>
            <div className="result">
                <input type="text" className="result-field styled" placeholder="Отдел" value={department} onChange={(e) =>  setDepartment(e.target.value)}/>
            </div>
            {
                props.isCreatForm ?
                (
                    <div className="actions-container">
                        <button className="action add"><img src={"/plus.svg"} alt={"Создать"}/></button>
                    </div>
                ) :
                (
                    <div className="actions-container">
                        <button className="action save"><img src={"/save.svg"} alt={"Сохранить"}/></button>
                        <button className="action delete"><img src={"/trash.svg"} alt={"Удалить"}/></button>
                    </div>
                )
            }

        </div>
    );
};