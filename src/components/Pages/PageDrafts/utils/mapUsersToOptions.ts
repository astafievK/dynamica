export const mapUsersToOptions = (users?: { id_user: number; name: string; surname: string }[]) =>
    users?.map(user => ({ id: user.id_user, title: `${user.name} ${user.surname}` })) ?? [];
