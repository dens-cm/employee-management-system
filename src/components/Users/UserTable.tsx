import { Badge, Table, Text } from '@chakra-ui/react'
import { USER_FIELDS, type AppUser } from '@/types/user'

interface UserTableProps {
    users: AppUser[]
}

export default function UserTable({ users }: UserTableProps) {
    if (users.length === 0) {
        return <Text fontSize='0.875rem' color='fg.muted' py='2rem' textAlign='center'>No users found.</Text>
    }

    return (
        <Table.ScrollArea borderWidth='1px' borderRadius='sm' bg='bg.panel'>
            <Table.Root size={{ base: 'sm', md: 'md' }} interactive>
                <Table.Header bg='bg.subtle'>
                    <Table.Row>
                        {USER_FIELDS.map((col) => (
                            <Table.ColumnHeader key={col.key} whiteSpace='nowrap' fontSize='0.8125rem'>{col.label}</Table.ColumnHeader>
                        ))}
                        <Table.ColumnHeader whiteSpace='nowrap' fontSize='0.8125rem'>Role</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map((u) => (
                        <Table.Row key={u.id}>
                            {USER_FIELDS.map((col) => (
                                <Table.Cell key={col.key} whiteSpace='nowrap' fontSize='0.875rem'>{u[col.key] || '—'}</Table.Cell>
                            ))}
                            <Table.Cell whiteSpace='nowrap'>
                                <Badge size='sm' colorPalette={u.is_admin ? 'blue' : 'gray'}>{u.is_admin ? 'Admin' : 'Non-Admin'}</Badge>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    )
}
