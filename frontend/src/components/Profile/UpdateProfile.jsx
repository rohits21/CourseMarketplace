import React from 'react'
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile.action';
import {useNavigate} from 'react-router-dom'



const UpdateProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const submitHandler = async (e)=>{
    e.preventDefault();
   await dispatch(updateProfile(name,email))
   navigate("/profile")

  

  }
  return (
    <Container py="16" minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Update Profile"
          my="16"
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type={'text'}
            focusBorderColor="yellow.500"
          />{' '}
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            focusBorderColor="yellow.500"
          />
          <Button
            isLoading={loading}
            w="full"
            colorScheme={'yellow'}
            type="submit"
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default UpdateProfile