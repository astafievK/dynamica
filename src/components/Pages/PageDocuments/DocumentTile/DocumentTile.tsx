import { FC } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

type StatusType = "На согласовании" | "На редактировании" | "Отклонено" | "В архиве";

interface DocumentTileProps {
    id: number;
    dateCreated: string;
    dateExpires: string;
    title: string;
    entity: string; // юр лицо автохолдинга
    counterparty: string; // контрагент
    serviceType: string; // вид услуги
    status: string;
}

const statusColors: Record<StatusType, { backgroundColor: string; color: string }> = {
    "На согласовании": { backgroundColor: "#E6F4EA", color: "#2E7D32" },
    "На редактировании": { backgroundColor: "#FFF8E1", color: "#F9A825" },
    "Отклонено": { backgroundColor: "#FCE8E6", color: "rgba(198,40,40,0.7)" },
    "В архиве": { backgroundColor: "#E0E0E0", color: "#616161" },
};

const getStatusStyles = (status: string): { backgroundColor: string; color: string } => {
    return statusColors[status as StatusType] || { backgroundColor: "#E0E0E0", color: "#616161" };
};

export const DocumentTile: FC<DocumentTileProps> = (props) => {
    const {backgroundColor, color} = getStatusStyles(props.status);

    return (
        <div className="document">
            <div className="document-head">
                <div className="document-title">
                    <DescriptionOutlinedIcon/>
                    <span>{props.title}</span>
                </div>
            </div>
            <div className="document-info">
                <div className="info-item">
                    <span className="info-title">Подписан</span>
                    <span className="info-value">{props.dateCreated}</span>
                </div>
                <div className="info-item">
                    <span className="info-title">До</span>
                    <span className="info-value">{props.dateExpires}</span>
                </div>
                <div className="info-item">
                    <span className="info-title">Тип</span>
                    <span className="info-value">{props.serviceType}</span>
                </div>
                <div className="info-item">
                    <span className="info-title">Контрагент</span>
                    <span className="info-value">{props.counterparty}</span>
                </div>
            </div>
            <div
                className="document-status"
                style={{
                    backgroundColor: backgroundColor,
                    color: color,
                    display: "inline-flex",
                    padding: "5px 10px",
                    borderRadius: "10px",
                }}
            >
                <span
                    style={{
                        color: color,
                    }}
                >{props.status}</span>
            </div>
        </div>
    );
}
