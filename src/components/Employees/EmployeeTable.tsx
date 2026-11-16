import { Button, HStack, Table, Text } from '@chakra-ui/react'
import { LuPencil, LuTrash2 } from 'react-icons/lu'
import { EMPLOYEE_FIELDS, type Employee } from '@/types/employee'

interface EmployeeTableProps {
    employees: Employee[]
    onEdit: (employee: Employee) => void
    onDelete: (id: string) => void
}

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
    if (employees.length === 0) {
        return <Text fontSize='0.875rem' color='fg.muted' py='2rem' textAlign='center'>No employees found.</Text>
    }

    return (
        <Table.ScrollArea borderWidth='1px' borderRadius='sm' bg='bg.panel'>
            <Table.Root size={{ base: 'sm', md: 'md' }} interactive>
                <Table.Header bg='bg.subtle'>
                    <Table.Row>
                        {EMPLOYEE_FIELDS.map((col) => (
                            <Table.ColumnHeader key={col.key} whiteSpace='nowrap' fontSize='0.8125rem'>{col.label}</Table.ColumnHeader>
                        ))}
                        <Table.ColumnHeader textAlign='right' whiteSpace='nowrap' fontSize='0.8125rem'>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employees.map((emp) => (
                        <Table.Row key={emp.id}>
                            {EMPLOYEE_FIELDS.map((col) => (
                                <Table.Cell key={col.key} whiteSpace='nowrap' fontSize='0.875rem'>{emp[col.key] || '—'}</Table.Cell>
                            ))}
                            <Table.Cell textAlign='right' whiteSpace='nowrap'>
                                <HStack justify='flex-end' gap='0.5rem'>
                                    <Button size='xs' variant='outline' onClick={() => onEdit(emp)}><LuPencil /> Update</Button>
                                    <Button size='xs' variant='subtle' colorPalette='red' onClick={() => onDelete(emp.id)}><LuTrash2 /> Delete</Button>
                                </HStack>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    )
}
