import { useState, type FormEvent } from 'react'
import { Box, Button, Field, Heading, IconButton, Input, Stack, Text } from '@chakra-ui/react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

type LoginValues = { email: string; password: string }

const LOGIN_FIELDS: { name: keyof LoginValues; label: string; type: string; placeholder: string; autoComplete: string }[] = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'name@company.com', autoComplete: 'email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', autoComplete: 'current-password' },
]

export default function LoginForm() {
    const navigate = useNavigate()
    const [values, setValues] = useState<LoginValues>({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (name: keyof LoginValues, value: string) => {
        if (error) setError('')
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!values.email.trim() || !values.password) {
            setError('Please enter your email and password.')
            return
        }
        navigate('/dashboard')
    }

    return (
        <Box as='form' onSubmit={handleSubmit} w='100%' maxW='26rem' bg='bg.panel' borderWidth='1px' borderRadius='sm' p={{ base: '1.25rem', md: '2rem' }} boxShadow='sm'>
            <Stack gap='1.25rem'>
                <Stack gap='0.25rem'>
                    <Heading fontSize={{ base: '1.375rem', md: '1.5rem' }} fontWeight='600' lineHeight='1.3'>Sign in</Heading>
                    <Text fontSize='0.875rem' color='fg.muted'>Employee Management System</Text>
                </Stack>

                <Stack gap='1rem'>
                    {LOGIN_FIELDS.map((field) => {
                        const isPassword = field.name === 'password'
                        const inputType = isPassword && showPassword ? 'text' : field.type
                        return (
                            <Field.Root key={field.name} required>
                                <Field.Label fontSize='0.875rem' fontWeight='500'>{field.label}</Field.Label>
                                <Box position='relative' w='100%'>
                                    <Input type={inputType} value={values[field.name]} onChange={(e) => handleChange(field.name, e.target.value)} placeholder={field.placeholder} autoComplete={field.autoComplete} h='2.75rem' fontSize='0.9375rem' pr={isPassword ? '2.75rem' : '0.875rem'} />
                                    {isPassword && (
                                        <IconButton aria-label={showPassword ? 'Hide password' : 'Show password'} variant='ghost' size='sm' position='absolute' right='0.25rem' top='50%' transform='translateY(-50%)' onClick={() => setShowPassword((prev) => !prev)}>
                                            {showPassword ? <LuEyeOff /> : <LuEye />}
                                        </IconButton>
                                    )}
                                </Box>
                            </Field.Root>
                        )
                    })}
                </Stack>

                {error && <Text fontSize='0.8125rem' color='fg.error'>{error}</Text>}

                <Button type='submit' w='100%' h='2.75rem' fontSize='0.9375rem' fontWeight='500'>
                    Sign in
                </Button>
            </Stack>
        </Box>
    )
}
