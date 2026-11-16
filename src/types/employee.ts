export const EMPLOYEE_TABLE = 'ems-employees'

export interface Employee {
    id: string
    f_name: string
    m_name: string
    l_name: string
    ext_name: string
    email: string
    phone: string
}

export type EmployeeFormValues = Omit<Employee, 'id'>

export const EMPLOYEE_FIELDS: { key: keyof EmployeeFormValues; label: string; type?: string; required?: boolean; placeholder: string }[] = [
    { key: 'f_name', label: 'First Name', required: true, placeholder: 'Juan' },
    { key: 'm_name', label: 'Middle Name', placeholder: 'Santos' },
    { key: 'l_name', label: 'Last Name', required: true, placeholder: 'Dela Cruz' },
    { key: 'ext_name', label: 'Ext. Name', placeholder: 'Jr.' },
    { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'name@company.com' },
    { key: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '09171234567' },
]

export const EMPTY_EMPLOYEE_FORM: EmployeeFormValues = { f_name: '', m_name: '', l_name: '', ext_name: '', email: '', phone: '' }
