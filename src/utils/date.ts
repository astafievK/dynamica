import {monthsGenitive} from "../constants/months.ts";

export const formatBirthday = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    return `${date.getDate()} ${monthsGenitive[month].toLowerCase()}`;
};

export const formatUnixTime = (unixTime: number): string => {
    const date = new Date(unixTime * 1000); // переводим секунды в миллисекунды

    const pad = (n: number) => n.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Месяцы начинаются с 0

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}.${month} ${hours}:${minutes}`;
}

export const getRemainingTimeString = (fromUnix: number, toUnix: number): string => {
    const diffInSeconds = toUnix - fromUnix;
    if (diffInSeconds <= 0) return '0 дн. 0 ч.';

    const secondsInHour = 3600;
    const secondsInDay = 86400;

    const days = Math.floor(diffInSeconds / secondsInDay);
    const hours = Math.floor((diffInSeconds % secondsInDay) / secondsInHour);

    return `${days} дн. ${hours} ч.`;
};
