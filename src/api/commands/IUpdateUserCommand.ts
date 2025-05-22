export interface UpdateUserCommand {
    id_user: number;
    position_title?: string | null;
    department_title?: string | null;
    phone?: string | null;
}