import { useState, type FormEvent } from 'react'
import { Button, Checkbox, CloseButton, Dialog, Field, Input, Portal, Stack } from '@chakra-ui/react'
import { EMPTY_USER_FORM, USER_FIELDS, type AppUser, type UserFormValues } from '@/types/user'

interface UserFormDialogProps {
    open: boolean
    user: AppUser | null
    onClose: () => void
    onSubmit: (values: UserFormValues) => Promise<void>
}

export default function UserFormDialog({ open, user, onClose, onSubmit }: UserFormDialogProps) {
    const [values, setValues] = useState<UserFormValues>(() => (user ? { full_name: user.full_name, email: user.email, is_admin: user.is_admin } : EMPTY_USER_FORM))
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
                    <Dialog.Content maxW='28rem' borderRadius='sm'>
                        <form onSubmit={handleSubmit}>
                            <Dialog.Header>
                                <Dialog.Title fontSize='1.125rem'>{user ? 'Update User' : 'Add User'}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Stack gap='0.875rem'>
                                    {USER_FIELDS.map((field) => (
                                        <Field.Root key={field.key} required={field.required}>
                                            <Field.Label fontSize='0.8125rem'>{field.label}</Field.Label>
                                            <Input type={field.type ?? 'text'} value={values[field.key]} onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))} placeholder={field.placeholder} h='2.5rem' fontSize='0.875rem' />
                                        </Field.Root>
                                    ))}
                                    <Checkbox.Root checked={values.is_admin} onCheckedChange={(details) => setValues((prev) => ({ ...prev, is_admin: Boolean(details.checked) }))}>
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label fontSize='0.875rem'>Admin</Checkbox.Label>
                                    </Checkbox.Root>
                                </Stack>
                            </Dialog.Body>
                            <Dialog.Footer gap='0.5rem'>
                                <Button type='button' variant='outline' size='sm' onClick={onClose}>Cancel</Button>
                                <Button type='submit' size='sm' loading={saving}>{user ? 'Update' : 'Add'}</Button>
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
