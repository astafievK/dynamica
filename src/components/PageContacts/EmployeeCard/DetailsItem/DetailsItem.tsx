import {FC} from "react";

interface DetailsItemProps {
    title: string;
    value: string;
}

export const DetailsItem: FC<DetailsItemProps> = ({ title, value }) => (
    <div className="details-item">
        <span className="details-title">{title}</span>
        <span className="detail">{value}</span>
    </div>
);
