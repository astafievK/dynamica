import { FC } from "react";

interface IEmployeeCardProps {
    name: string;
    position: string;
    division: string;
    city: string;
    email: string | null;
    phone: string;
    birthday: string;
    image: string;
}

export const EmployeeCard: FC<IEmployeeCardProps> = (props) => {
    return (
        <div className="employee-card">
            <div className="employee-image">
                <img loading={"lazy"} src={`/${props.image}`} alt=""/>
            </div>
            <div className="employee-info">
                <div className="employee-info__general">
                    <span className="employee-name">{props.name}</span>
                    <span className="employee-position">{props.position}</span>
                    <span className="employee-division">{props.division}</span>
                    <span className="employee-city">{props.city}</span>
                </div>
                <div className="sep"></div>
                <div className="employee-info__contacts">
                    <span className="employee-birthday">{props.birthday}</span>
                    <span className="employee-email">{props.email}</span>
                    <span className="employee-phone">{props.phone}</span>
                </div>
            </div>
        </div>
    );
};
