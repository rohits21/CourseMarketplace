import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const params = useParams()
  return (
    <Container h={'90vh'} >
    <VStack h={'full'} justifyContent={'center'}>
        <Heading textAlign={'center'} children={'Reset Password'} />

        <form style={{ width: '100%', textAlign: 'center' }} >

            <Box my={4}>
                <FormLabel htmlFor='password' children='Email New Password' />
                <Input
                    required
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter New Password'
                    type='password'
                    focusBorderColor='yellow.500'
                />

            </Box>


            <Box my={4}>

                <Button colorScheme='yellow' mx={4} type='submit'>Save </Button>

            </Box>

            

           
            


        </form>
    </VStack>
</Container>
  )
}

export default ResetPassword