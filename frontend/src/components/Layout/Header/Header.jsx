import React from 'react'
import ColorModeSwitcher from '../../../ColorModeSwitcher'
import { RiDashboardFill, RiLogoutBoxFill, RiMenu5Line } from 'react-icons/ri'
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../redux/actions/user';


const Header = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const logoutHandler = ()=>{
        dispatch(logoutUser())
        onClose();
        navigate("/")
    }

    const {isAuthenticated, user} = useSelector(state=>state.user)

   console.log(isAuthenticated, user);

    return (
        <>
            <ColorModeSwitcher />
            <Button colorScheme='yellow' width={'12'} height={'12'} rounded={'full'} zIndex={1} position={'sticky'} top={'6'} left={'6'} onClick={onOpen}>
                <RiMenu5Line />
            </Button>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen} >

                <DrawerOverlay backdropFilter={'blur(3px)'} />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'}>
                        <Button colorScheme='yellow' width={'12'} height={'12'} rounded={'full'} onClick={onClose} mr={'4'}>
                            <HiOutlineArrowLeft />
                        </Button>
                        COURSE BUNDLER
                     </DrawerHeader>
                    <DrawerBody>

                        <VStack alignItems={'flex-start'} spacing={'4'}>
                           <LinkButton closeHandler={onClose} url='/' title='Home' />
                           <LinkButton closeHandler={onClose} url='/courses' title='Browse All Corses' />
                           <LinkButton closeHandler={onClose} url='/request' title='Request a Course' />
                           <LinkButton closeHandler={onClose} url='/contact' title='Contact Us' />
                           <LinkButton closeHandler={onClose} url='/about' title='About' />

                           <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'}>

                            {
                                isAuthenticated ? (
                                    <>

                                    <VStack>
                                        <HStack>
                                        <Link to='/profile'> <Button onClick={onClose} variant={'ghost'} colorScheme='yellow'>Profile</Button> </Link>
                                        <Button onClick={logoutHandler} > <RiLogoutBoxFill/> Logout</Button> 

                                        </HStack>

                                        {
                                            user && user.Role === 'admin' && <Link to={'/admin/dashboard'}><Button colorScheme='purple' onClick={onClose} variant={'ghost'}><RiDashboardFill/>Dashboard</Button></Link>
                                        }
                                    </VStack>

                                    
                                    </>
                                ) : (<>

                               <Link to='/login'> <Button onClick={onClose} colorScheme='yellow'>Login</Button> </Link>
                               <p>OR</p>
                               <Link to='/signup'> <Button onClick={onClose} colorScheme='yellow'>Sign Up</Button> </Link>
                                </>)
                            }

                           </HStack>

                        </VStack>
                    </DrawerBody>
                </DrawerContent>

            </Drawer>
        </>
    )
}

export default Header

const LinkButton = ({url = '/', title = 'Home', closeHandler })=>{
    return (
        <Link  onClick={closeHandler} to={url}><Button variant={'ghost'}> {title}</Button></Link>
    )
}