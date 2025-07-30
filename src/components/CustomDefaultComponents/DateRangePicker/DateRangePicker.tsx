import React, { FC } from "react";
import "./DateRangePicker.css";

interface DateRangePickerProps {
    from: string | null;
    to: string | null;
    setFrom: (value: string | null) => void;
    setTo: (value: string | null) => void;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({ from, to, setFrom, setTo }) => {
    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFrom = e.target.value || null;
        if (to && newFrom && newFrom > to) {
            setTo(newFrom); // Авто-исправление "до"
        }
        setFrom(newFrom);
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTo = e.target.value || null;
        if (from && newTo && newTo < from) {
            setFrom(newTo); // Авто-исправление "с"
        }
        setTo(newTo);
    };

    return (
        <div className="date-range-picker">
            <div className="date-picker-item">
                <label htmlFor="from">С</label>
                <input
                    type="date"
                    id="from"
                    value={from ?? ""}
                    onChange={handleFromChange}
                    max={to ?? undefined}
                />
            </div>
            <div className="date-picker-item">
                <label htmlFor="to">До</label>
                <input
                    type="date"
                    id="to"
                    value={to ?? ""}
                    onChange={handleToChange}
                    min={from ?? undefined}
                />
            </div>
        </div>
    );
};
