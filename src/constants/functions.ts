export const formatDatetime = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    }).format(date).replace(",", "");
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(date);
};

export const formatDateForLabel = (dateStr: string): string => {
    if (!dateStr) return "День рождения";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("ru-RU").format(date); // формат ДД.ММ.ГГГГ
};
