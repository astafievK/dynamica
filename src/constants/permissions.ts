export const Permissions = {
    CreateUpdateNews: 'create_update_news',
    UpdateUsers: 'update_users',
    Superuser: 'superuser',
    DocumentApprover: 'document_approver',
} as const;

export type Permission = typeof Permissions[keyof typeof Permissions];