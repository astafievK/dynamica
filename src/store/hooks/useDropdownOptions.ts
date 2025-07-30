import { useMemo } from 'react';

export function useDropdownOptions<T>(
    data: T[] | undefined,
    idKey: keyof T,
    titleKey: keyof T
): { id: number; title: string }[] {
    return useMemo(
        () =>
            data?.map((item) => ({
                id: item[idKey] as number,
                title: item[titleKey] as string,
            })) ?? [],
        [data, idKey, titleKey]
    );
}
