import { useState } from 'react'
import { Button, HStack, Heading, Stack } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'
import UserFormDialog from '@/components/dialogs/UserFormDialog'
import UserTable from '@/components/Users/UserTable'
import { useUsers } from '@/hooks/useUsers'

export default function Users() {
    const { users, addUser } = useUsers()
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <Stack w='100%' gap='1.25rem'>
            <HStack justify='space-between' align='center' flexWrap='wrap' gap='0.75rem'>
                <Heading fontSize={{ base: '1.25rem', md: '1.5rem' }} fontWeight='600'>Users</Heading>
                <Button size={{ base: 'xs', md: 'sm' }} onClick={() => setDialogOpen(true)}><LuPlus /> Add User</Button>
            </HStack>

            <UserTable users={users} />

            {dialogOpen && <UserFormDialog open={dialogOpen} user={null} onClose={() => setDialogOpen(false)} onSubmit={addUser} />}
        </Stack>
    )
}
