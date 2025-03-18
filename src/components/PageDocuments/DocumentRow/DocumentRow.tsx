import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface DocumentRowProps {
    id: number;
    dateCreated: string;
    dateExpires: string;
    title: string;
    entity: string; // юр лицо автохолдинга
    counterparty: string; // контрагент
    serviceType: string; // виду услуги
    status: string;
}

export const DocumentRow: FC<DocumentRowProps> = (props) => {
    const navigate = useNavigate();

    const handleRowClick = (id: number) => {
        navigate(`/documents/${id}`);
    };

    return (
        <tr
            onClick={() => handleRowClick(props.id)}
        >
            <td>{props.dateCreated}</td>
            <td>{props.dateExpires}</td>
            <td>{props.title}</td>
            <td>{props.entity}</td>
            <td>{props.counterparty}</td>
            <td>{props.serviceType}</td>
            <td>{props.status}</td>
        </tr>
    );
};
