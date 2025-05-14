import {monthsGenitive} from "../constants/months.ts";

export const formatBirthday = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    return `${date.getDate()} ${monthsGenitive[month].toLowerCase()}`;
};