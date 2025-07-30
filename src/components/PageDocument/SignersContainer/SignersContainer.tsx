import { FC } from "react";
import "./SignersContainer.css";

const progressData = [
    { status: true, division: "Центральный маркетинг", person: "Максим Александров" },
    { status: true, division: "Служба безопасности", person: "Алексей Усачев" },
    { status: false, division: "Юристы", person: "Неизвестный Юрист" },
    { status: false, division: "Бухгалтерия", person: "Неизвестный Бухгалтер" },
];

export const SignersContainer: FC = () => {
    return (
        <div className="document-signers-wrapper">
            <span className="document-signers__title">Согласующие</span>
            <ul className="document-signers__list">
                {progressData.map((item, index) => (
                    <li className="signer" key={index}>
                        <div className="signer__info">
                            <div className="signer__info-secondary">
                                <span className="signer__division">{item.division}</span>
                                <span className="signer__status">Статус</span>
                            </div>
                            <div className="signer__info-main">
                                <span className="signer__name">{item.person}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
