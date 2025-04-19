import {FC, useState} from "react";
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

interface DetailsItemProps {
    title: string;
    value: string;
    isReadOnly?: boolean;
}

const iconMap: Record<string, JSX.Element> = {
    "Должность": <BadgeRoundedIcon />,
    "Подразделение": <GroupRoundedIcon />,
    "Контактный телефон": <PhoneRoundedIcon />,
    "Почта": <EmailRoundedIcon />
};

export const DetailsItem: FC<DetailsItemProps> = ({ title, value, isReadOnly = true }) => {
    const [tempValue, setTempValue] = useState<string>(value)

    return (
        <div className="details-item">
            <div className="details-title">
                {iconMap[title]}
                <span>{title}</span>
            </div>
            {
                isReadOnly && <span className="detail">{value}</span>
            }
            {
                !isReadOnly && <input className="detail" type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} />
            }
        </div>
    );
};
