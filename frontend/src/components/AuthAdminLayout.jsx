import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "./Layout/Loader/Loader"

export default function ProtectedAdmin({children, authentication=true}){

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.user.isAuthenticated)
   let role = "user";
   if(authStatus){
    role = useSelector(state => state.user.user.Role)
}
   

    useEffect( ()=>{

        console.log("User Role", role);

        if(!authStatus){
            navigate("/login")
        }else if(!authStatus || role !== 'admin' ){
            navigate('/')
        }

        setLoader(false)

    },[authStatus, navigate, authentication] )
    

    return (
        loader ? <Loader/>: <>{children}</>
    )
}