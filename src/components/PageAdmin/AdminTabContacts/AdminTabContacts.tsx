import { FC, useState } from "react";
import { Dropdown } from "../../Dropdown/Dropdown";

export const AdminTabContacts: FC = () => {
    const [selectedVariant1, setSelectedVariant1] = useState("Вариант 1.1");
    const [selectedVariant2, setSelectedVariant2] = useState("Вариант 2.1");
    const [selectedVariant3, setSelectedVariant3] = useState("Вариант 3.1");
    console.log(selectedVariant3, selectedVariant2, selectedVariant1)

    return (
        <div className="content-tab content-tab--contacts">
            <div className="associations-container">
                <div className="association">
                    <div className="variants">
                        <Dropdown
                            options={["Вариант 1.1", "Вариант 1.2", "Вариант 1.3", "Вариант 1.4"]}
                            label="Город"
                            onSelect={setSelectedVariant1}
                        />
                        <Dropdown
                            options={["Вариант 2.1", "Вариант 2.2", "Вариант 2.3", "Вариант 2.4"]}
                            label="Подразделение"
                            onSelect={setSelectedVariant2}
                        />
                        <Dropdown
                            options={["Вариант 3.1", "Вариант 3.2", "Вариант 3.3", "Вариант 3.4"]}
                            label="Организация"
                            onSelect={setSelectedVariant3}
                        />
                    </div>
                    <div className="arrow-container">
                        <img className={"arrow"} src={"/arrow.svg"} alt={""}/>
                    </div>
                    <div className="result">
                        <input type={"text"} className={"result-field styled"} placeholder={"Отдел"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};