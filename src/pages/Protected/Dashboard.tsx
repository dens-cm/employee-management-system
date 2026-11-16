import { Box, Code, Flex, Heading, Stack, Text } from '@chakra-ui/react'

export default function Dashboard() {
    return (
        <Stack w='100%' h='100%' gap='1.25rem'>
            <Heading fontSize={{ base: '1.25rem', md: '1.5rem' }} fontWeight='600'>Dashboard</Heading>
            <Flex w='100%' minH={{ base: '16rem', md: '24rem' }} align='center' justify='center' bg='bg.subtle' borderWidth='1px' borderStyle='dashed' borderRadius='sm' p={{ base: '1.25rem', md: '2rem' }} textAlign='center'>
                <Box>
                    <Text fontSize={{ base: '0.875rem', md: '1rem' }} color='fg.muted'>
                        Add designs here by editing <Code fontSize='0.875rem'>Dashboard.tsx</Code>
                    </Text>
                </Box>
            </Flex>
        </Stack>
    )
}
