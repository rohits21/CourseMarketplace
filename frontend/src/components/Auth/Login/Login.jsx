import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginMethod } from '../../../redux/actions/user'



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(loginMethod(email, password))
    }

    return (
        <Container h={'90vh'} >
            <VStack h={'full'} justifyContent={'center'} spacing={8}>
                <Heading textAlign={'center'} children={'Welcome to CourseBundler'} />

                <form onSubmit={submitHandler} style={{ width: '100%', textAlign: 'center' }} >

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

                        <FormLabel htmlFor='password' children='Password' />
                        <Input
                            required
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            focusBorderColor='yellow.500'
                            placeholder='Enter Password'
                        />

                    </Box>

                    <Box my={4}>

                        <Link to={'/forgetpassword'}> <Button fontSize={'sm'} variant={'link'}>Forget Password</Button> </Link>

                        <Button colorScheme='yellow' mx={4} type='submit'>Login </Button>

                    </Box>

                    

                    <Link to={'/signup'}> <Button fontSize={'m'} fontFamily={'cursive'} variant={'link'}>New User ? Sign Up</Button> </Link>
                    


                </form>
            </VStack>
        </Container>
    )
}

export default Login