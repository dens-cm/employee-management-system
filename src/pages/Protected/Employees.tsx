import { useState } from 'react'
import { Button, HStack, Heading, Stack } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'
import EmployeeFormDialog from '@/components/dialogs/EmployeeFormDialog'
import EmployeeTable from '@/components/Employees/EmployeeTable'
import { useEmployees } from '@/hooks/useEmployees'
import type { Employee, EmployeeFormValues } from '@/types/employee'

export default function Employees() {
    const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selected, setSelected] = useState<Employee | null>(null)

    const handleAddClick = () => {
        setSelected(null)
        setDialogOpen(true)
    }

    const handleEditClick = (employee: Employee) => {
        setSelected(employee)
        setDialogOpen(true)
    }

    const handleSubmit = async (values: EmployeeFormValues) => {
        if (selected) await updateEmployee(selected.id, values)
        else await addEmployee(values)
    }

    return (
        <Stack w='100%' gap='1.25rem'>
            <HStack justify='space-between' align='center' flexWrap='wrap' gap='0.75rem'>
                <Heading fontSize={{ base: '1.25rem', md: '1.5rem' }} fontWeight='600'>Employees</Heading>
                <Button size={{ base: 'xs', md: 'sm' }} onClick={handleAddClick}><LuPlus /> Add Employee</Button>
            </HStack>

            <EmployeeTable employees={employees} onEdit={handleEditClick} onDelete={deleteEmployee} />

            {dialogOpen && <EmployeeFormDialog key={selected?.id ?? 'new'} open={dialogOpen} employee={selected} onClose={() => setDialogOpen(false)} onSubmit={handleSubmit} />}
        </Stack>
    )
}
