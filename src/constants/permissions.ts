export const Permissions = {
    CreateUpdateNews:           'create_update_news',
    UpdateUsers:                'update_users',
    Superuser:                  'superuser',
    ApproverSecurityService:    'approver_security_service',
    ApproverCentralMarketing:   'approver_central_marketing',
    ApproverLegal:              'approver_legal',
    ApproverAccounting:         'approver_accounting',
    Developer:                  'developer',
} as const;

export type Permission = typeof Permissions[keyof typeof Permissions];