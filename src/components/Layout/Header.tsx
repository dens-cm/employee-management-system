import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Employees', path: '/employees' },
    { label: 'Users', path: '/users' },
]

export default function Header() {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <Box as='header' w='100%' h='3rem' zIndex='1' boxShadow='sm' px={{ base: 3, md: 6 }}>
            <HStack justify='space-between' w='100%' h='100%'>
                <Flex h='100%' align='center' gap={{ base: 2, md: 4 }}>
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.path
                        return (
                            <Button key={item.path} size='xs' variant='plain' position='relative' fontWeight={isActive ? '600' : '500'} onClick={() => navigate(item.path)} _after={{ content: '""', position: 'absolute', left: 0, bottom: 0, w: '100%', h: '0.125rem', bg: 'currentColor', transform: isActive ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.2s ease-in-out' }} _hover={{ _after: { transform: 'scaleX(1)' } }}>
                                {item.label}
                            </Button>
                        )
                    })}
                </Flex>
                <Button size='sm' variant='subtle' colorPalette='red'>Log out <BiLogOut/></Button>
            </HStack>
        </Box>
    )
}
