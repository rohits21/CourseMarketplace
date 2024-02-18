import { Heading, Stack, VStack, Text, Button, Img , Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import vg from "../../assets/Images/5.png"
import {CgGoogle, CgYoutube} from 'react-icons/cg'
import {SiCoursera, SiUdemy} from 'react-icons/si'
import introVideo from '../../assets/videos/Introvideo.mp4'
import Footer from '../Layout/Footer/Footer'

const Home = () => {
  return (
   <section className='home'>

    <div className='container'>
        <Stack
          direction={["column", "row"]}
          height={'100%'}
          justifyContent={["center", "space-between"]}
          alignItems='center'
          spacing={["16", "56"]}
        >

          <VStack width={'full'} alignItems={["center", "flex-end"]} spacing={'8'}>
            <Heading children="LEARN FROM THE EXPERTS" size={'2xl'}/>
            <Text fontSize={'2xl'} fontFamily='cursive' textAlign={["center", "left"]}>Find Valuable content at reasonable price</Text>
            <Link to='/courses' >
              <Button size='lg' colorScheme='yellow'> Explore Now</Button>
            </Link>
          </VStack>

          <Img className='vector-graphics' src={vg} boxSize={'md'} objectFit={'contain'}/>

        </Stack>
    </div>

    <Box  padding={'8'} bg={'black'} zIndex={0}>
      <Heading textAlign={'center'} fontFamily={'body'}  color={'yellow'} children='OUR BRANDS'/>
      <HStack className='brandsBanner'>
      <CgGoogle/>
      <CgYoutube/>
      <SiCoursera/>
      <SiUdemy/>
    </HStack>
    </Box>

    <div className="container-2">
      <video 
        src={introVideo} 
        autoPlay
        controls
        muted
        controlsList='nodownload nofullscreen noremoteplayback'
        disablePictureInPicture
        disableRemotePlayback        
        >

        </video>
    </div>

   <Footer/>

   </section>
  )
}

export default Home