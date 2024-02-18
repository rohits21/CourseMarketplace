import React, { useEffect } from 'react'
import ColorModeSwitcher from './ColorModeSwitcher'
import { Outlet } from 'react-router-dom'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import toast,{Toaster} from 'react-hot-toast'
import { clearError, clearMessage } from './redux/reducers/userSlice'
import { loadUser } from './redux/actions/user'
import Loader from './components/Layout/Loader/Loader'


const App = () => {

  const dispatch = useDispatch()

  window.addEventListener("contextmenu", (e)=>e.preventDefault() )

  const {isAuthenticated, user, message, error, loading} = useSelector(state=>state.user)
  console.log("APPjsx :: State ",isAuthenticated, user, message, error);

  useEffect( ()=>{
    if(error){
      toast.error(error)
      dispatch(clearError())
    }
    if(message){
      toast.success(message)
      dispatch(clearMessage())
    }
  }, [message, error, dispatch] )


  useEffect( ()=>{
    dispatch(loadUser())
  }, [dispatch])

  return (

  
     <>

     {
      loading ? <Loader/> : <>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <div style={{position:'relative'}}>
        <Outlet/>
        </div>
          
        <Footer/>
        <Toaster/>
      
      </>
     }

  
      
      </>
  

   
    
    
   
  )
}

export default App