import { Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Courses = () => {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("")

    const addToPlaylistHandler = ()=>{
        alert("Addrd to plalist")
    }

    const categories = ["Web Development", "Artificial Intelligence", "Cyber Security", "Data Structures and Algorithm", "App Development", "Web Development", "Artificial Intelligence", "Cyber Security", "Data Structures and Algorithm", "App Development"]
    return (
        <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>

            <Heading children="All Courses" m={"8"} />
            <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />

            <HStack overflowY={'auto'} marginY={'8'} flexWrap={'wrap'} maxH={'20vh'}
                css={{
                    "&::-webkit-scrollbar": {
                        display: "none"
                    },


                }}>

                {
                    categories.map((item) => (<Button key={item} onClick={() => (setCategory(item))} minW={'50'}> <Text children={item} /> </Button>))
                }


            </HStack>

            <Stack
                direction={["coloumn", "row"]}
                flexWrap={'wrap'}
                justifyContent={['flex-start', 'space-evenly']}
                alignItems={['center', 'flex-start']}
            >

                <Course
                    title={"Sample"}
                    description={"Sample"}
                    views={12}
                    id={'Sample'}
                    creator={'RIMI'}
                    lectureCount={12}
                    addToPlaylistHandler={addToPlaylistHandler}
                />

            </Stack>

        </Container>
    )
}

const Course = ({ views, title, imgSrc, id, addToPlaylistHandler, creator, description, lectureCount }) => {
    return (
        <VStack className='course' alignItems={['center', 'flex-start']}>
            <Image src={imgSrc} boxSize={'60'} objectFit={'contain'} />
            <Heading textAlign={['center', 'left']} children={title} maxW={'200px'} fontFamily={'sans-serif'} noOfLines={3} size={'sm'} />
            <Text noOfLines={2} children={description} />

            <HStack>
                <Text fontWeight={'bold'} textTransform={'uppercase'} children={"Creator"} />
                <Text fontFamily={'body'} textTransform={'uppercase'} children={creator} />
            </HStack>

            <Heading textAlign={'center'} textTransform={'uppercase'} size={'xs'} children={`Lectures - ${lectureCount}`} />
            <Heading textTransform={'uppercase'} size={'xs'} children={`Views - ${views}`} />

            <Stack direction={['column', 'row']} alignItems={'center'}>
                <Link to={`/course/:${id}`}>
                    <Button colorScheme='blue'>Watch Now</Button>
                </Link>
                
                    <Button colorScheme='blue' variant={'ghost'} onClick={()=>(addToPlaylistHandler(id))}>Add to Playlist</Button>
               

            </Stack>

        </VStack>
    )
}

export default Courses