import React from 'react'
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import {useDispatch} from 'react-redux'
import { changePassword } from '../../redux/actions/profile.action';

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch()

  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(changePassword(oldPassword, newPassword));
    
  }


  return (
    <Container py="16" minH={'90vh'}>
    <form onSubmit={submitHandler}>
      <Heading
        textTransform={'uppercase'}
        children="Change Password"
        my="16"
        textAlign={['center', 'left']}
      />

      <VStack spacing={'8'}>
        <Input
          required
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          placeholder="Old Password"
          type={'password'}
          focusBorderColor="yellow.500"
        />

        <Input
          required
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="New Password"
          type={'password'}
          focusBorderColor="yellow.500"
        />

        <Button
          isLoading={loading}
          w="full"
          colorScheme={'yellow'}
          type="submit"
        >
          Change
        </Button>
      </VStack>
    </form>
  </Container>
  )
}

export default ChangePassword