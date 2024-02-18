/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "./Layout/Loader/Loader"

export default function Protected({children, authentication=true}){

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.user.isAuthenticated)


    useEffect( ()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/profile")
        }

        setLoader(false)

    },[authStatus, navigate, authentication] )
    

    return (
        loader ?<Loader/> : <>{children}</>
    )
}