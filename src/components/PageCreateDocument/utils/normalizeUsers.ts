type NormalizedUser = { id_user: number; fullName: string };

export const normalizeUsers = (users?: { id_user: number; name: string; surname: string }[]): NormalizedUser[] =>
    users?.map((user) => ({
        id_user: user.id_user,
        fullName: `${user.name} ${user.surname}`
    })) ?? [];
