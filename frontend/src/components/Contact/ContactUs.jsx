import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ContactUs = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
  return (
    <Container h={'90vh'} >
    <VStack h={'full'} justifyContent={'center'} spacing={8}>
        <Heading textAlign={'center'} children={'Contact Us'} />

        <form style={{ width: '100%', textAlign: 'center' }} >

        <Box my={4}>
                <FormLabel htmlFor='name' children='Name' />
                <Input
                    required
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter Your Name'
                    type='text'
                    focusBorderColor='yellow.500'
                />

            </Box>

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

                <FormLabel htmlFor='message' children='Message' />
                <Input
                    required
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    focusBorderColor='yellow.500'
                    type='text'
                    placeholder='Enter Your Message'
                />

            </Box>

            <Box my={4}>

                <Button colorScheme='yellow' mx={4} type='submit'>Send Mail </Button>

            </Box>

            

            <Link to={'/request'}> <Button fontSize={'m'} fontFamily={'cursive'} variant={'link'}>Request a course ? Click here</Button> </Link>
            


        </form>
    </VStack>
</Container>
  )
}

export default ContactUs