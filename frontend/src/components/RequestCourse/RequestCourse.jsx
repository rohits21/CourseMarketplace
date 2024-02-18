import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RequestCourse = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [course, setCourse] = useState("")
  return (
    <Container h={'90vh'} >
    <VStack h={'full'} justifyContent={'center'} >
        <Heading textAlign={'center'} children={'Request a Course'} />

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

                <FormLabel htmlFor='course' children='Course' />
                <Input
                    required
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    focusBorderColor='yellow.500'
                    type='text'
                    placeholder='Enter Your Message'
                />

            </Box>

            <Box my={4}>

                <Button colorScheme='yellow' mx={4} type='submit'>Send Mail </Button>

            </Box>

            

            <Link to={'/courses'}> <Button fontSize={'m'} fontFamily={'cursive'} variant={'link'}>See Available Courses</Button> </Link>
            


        </form>
    </VStack>
</Container>
  )
}

export default RequestCourse