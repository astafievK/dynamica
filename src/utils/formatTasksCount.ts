export const formatTasksCount = (count: number): string => {
    const mod10 = count % 10;
    const mod100 = count % 100;

    let word = 'вопросов';

    if (mod100 >= 11 && mod100 <= 14) {
        word = 'вопросов';
    } else if (mod10 === 1) {
        word = 'вопрос';
    } else if (mod10 >= 2 && mod10 <= 4) {
        word = 'вопроса';
    }

    return `${count} ${word}`;
};
