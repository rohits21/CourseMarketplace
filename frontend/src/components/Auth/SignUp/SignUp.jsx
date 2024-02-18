import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../../../redux/actions/user'

export const fileUploadCss = {
    cursor:'pointer',
    marginLeft:"-5%",
    width:"110%",
    border:"none",
    height:'100%',
    color:"#ECC94B",
   
}
const fileUploadBtn= {
    "&::file-selector-button": fileUploadCss
}

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [imagePrev, setImagePrev] = useState("")
    const [image, setImage] = useState("")

    const dispatch = useDispatch()
    const changeImageHandler = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = ()=>{
            setImagePrev(reader.result)
            setImage(file)
        }
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        const myForm = new FormData()
        myForm.append("name",name)
        myForm.append("email",email)
        myForm.append("password",password)
        myForm.append("file",image)

        dispatch(registerUser(myForm))

    }
  return (
    <Container minH={'95vh'} >
    <VStack h={'full'} justifyContent={'center'} spacing={4}>
        <Heading textAlign={'center'} children={'Welcome to CourseBundler'} />
        <Heading textAlign={'center'} fontSize={'m'} children={'Sign Up here'} />

        <form onSubmit={submitHandler} style={{ width: '100%', textAlign: 'center' }} >


        <VStack my={4} >
                <FormLabel htmlFor='avatar' children='Avatar' />
                <Avatar src={imagePrev} size={'2xl'} />
                <Input
                    placeholder='Image'
                    required
                    id="avatar"
                    type='file'
                    accept='image/*'
                    focusBorderColor='yellow.500'
                    onChange={changeImageHandler}
                    textAlign={'center'}
                    css={fileUploadBtn}
                />
                
            </VStack>
            
            
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

               {/* // <Link to={'/forgetpassword'}> <Button fontSize={'sm'} variant={'link'}>Forget Password</Button> </Link> */}

                <Button colorScheme='yellow' mx={4} type='submit'>Sign Up </Button>

            </Box>

            

            <Link to={'/login'}> <Button fontSize={'m'} fontFamily={'cursive'} variant={'link'}>Existing User ? Log In here</Button> </Link>
            


        </form>
    </VStack>
</Container>
  )
}

export default SignUp