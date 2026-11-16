import { useState, type FormEvent } from 'react'
import { Button, CloseButton, Dialog, Field, Input, Portal, SimpleGrid } from '@chakra-ui/react'
import { EMPTY_EMPLOYEE_FORM, EMPLOYEE_FIELDS, type Employee, type EmployeeFormValues } from '@/types/employee'

interface EmployeeFormDialogProps {
    open: boolean
    employee: Employee | null
    onClose: () => void
    onSubmit: (values: EmployeeFormValues) => Promise<void>
}

export default function EmployeeFormDialog({ open, employee, onClose, onSubmit }: EmployeeFormDialogProps) {
    const [values, setValues] = useState<EmployeeFormValues>(() => (employee ? { f_name: employee.f_name, m_name: employee.m_name, l_name: employee.l_name, ext_name: employee.ext_name, email: employee.email, phone: employee.phone } : EMPTY_EMPLOYEE_FORM))
    const [saving, setSaving] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setSaving(true)
        await onSubmit(values)
        setSaving(false)
        onClose()
    }

    return (
        <Dialog.Root open={open} onOpenChange={(details) => { if (!details.open) onClose() }} placement='center'>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner px='1rem'>
                    <Dialog.Content maxW='32rem' borderRadius='sm'>
                        <form onSubmit={handleSubmit}>
                            <Dialog.Header>
                                <Dialog.Title fontSize='1.125rem'>{employee ? 'Update Employee' : 'Add Employee'}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <SimpleGrid columns={{ base: 1, md: 2 }} gap='0.875rem'>
                                    {EMPLOYEE_FIELDS.map((field) => (
                                        <Field.Root key={field.key} required={field.required}>
                                            <Field.Label fontSize='0.8125rem'>{field.label}</Field.Label>
                                            <Input type={field.type ?? 'text'} value={values[field.key]} onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))} placeholder={field.placeholder} h='2.5rem' fontSize='0.875rem' />
                                        </Field.Root>
                                    ))}
                                </SimpleGrid>
                            </Dialog.Body>
                            <Dialog.Footer gap='0.5rem'>
                                <Button type='button' variant='outline' size='sm' onClick={onClose}>Cancel</Button>
                                <Button type='submit' size='sm' loading={saving}>{employee ? 'Update' : 'Add'}</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size='sm' />
                            </Dialog.CloseTrigger>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
