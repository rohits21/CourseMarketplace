import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
    const [email, setEmail] = useState("")
  return (
    <Container h={'90vh'} >
    <VStack h={'full'} justifyContent={'center'}>
        <Heading textAlign={'center'} children={'Forget Password'} />

        <form style={{ width: '100%', textAlign: 'center' }} >

            <Box my={4}>
                <FormLabel htmlFor='email' children='Email Address' />
                <Input
                    required
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Your Email'
                    type='email'
                    focusBorderColor='yellow.500'
                />

            </Box>


            <Box my={4}>

                <Button colorScheme='yellow' mx={4} type='submit'>Send Reset Link </Button>

            </Box>

            

            <Link to={'/signup'}> <Button fontSize={'m'} fontFamily={'cursive'} variant={'link'}>New User ? Sign Up</Button> </Link>
            


        </form>
    </VStack>
</Container>
  )
}

export default ForgetPassword