import React from 'react'
import {TiSocialYoutubeCircular, TiSocialInstagramCircular} from 'react-icons/ti'
import {DiGithub} from 'react-icons/di'
import {Box, HStack, Heading, Stack, VStack} from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} h={'20vh'}>

      <Stack direction={['column', 'row']}  >

        <VStack alignItems={['center', 'flex-start']} width={'full'}> 
            <Heading children={'All rights reserved'} color={'white'} />
            <Heading children={'Rohit Sahu'} color={'yellow.600'} fontFamily={'body'} size={'sm'}/>
        </VStack>

        <HStack spacing={['2','10']} justifyContent={'center'} color={'white'} fontSize={50}>

          <a href="#" target='blank'> <TiSocialYoutubeCircular/> </a>
          <a href="#" target='blank'> <TiSocialInstagramCircular/> </a>
          <a href="#" target='blank'> <DiGithub/> </a>

        </HStack>
      </Stack>

    </Box>
  )
}

export default Footer