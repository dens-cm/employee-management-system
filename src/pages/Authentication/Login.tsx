import { Flex } from '@chakra-ui/react'
import LoginForm from '@/components/Authentication/LoginForm'

export default function Login() {
    return (
        <Flex w='100%' minH='100dvh' align='center' justify='center' bg='bg.subtle' px='1rem' py='1.5rem'>
            <LoginForm />
        </Flex>
    )
}
