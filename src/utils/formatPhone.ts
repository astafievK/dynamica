export function formatPhone(phone: string): string {
    const digitsOnly = phone.replace(/\D/g, '');

    // Проверка, что номер начинается с 7 или 8 и содержит 11 цифр
    if (!/^(\+?7|8)\d{10}$/.test(digitsOnly)) {
        return phone; // Возврат без форматирования, если не проходит
    }

    return digitsOnly.replace(
        /^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/,
        '+$1 ($2) $3-$4-$5'
    );
}