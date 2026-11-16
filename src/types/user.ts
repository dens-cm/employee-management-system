export const USER_TABLE = 'ems-users'

export interface AppUser {
    id: string
    full_name: string
    email: string
    is_admin: boolean
}

export type UserFormValues = Omit<AppUser, 'id'>

export const USER_FIELDS: { key: 'full_name' | 'email'; label: string; type?: string; required?: boolean; placeholder: string }[] = [
    { key: 'full_name', label: 'Full Name', required: true, placeholder: 'Juan Dela Cruz' },
    { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'user@company.com' },
]

export const EMPTY_USER_FORM: UserFormValues = { full_name: '', email: '', is_admin: false }
