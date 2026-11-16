import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Layout/Header'

export default function ProtectedLayout() {
    return (
        <Flex direction='column' minH='100vh' w='100%'>
            <Header />
            <Box as='main' flex='1' w='100%' p={{ base: 4, md: 6 }}>
                <Outlet />
            </Box>
        </Flex>
    )
}
