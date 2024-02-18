import { server } from "../store";
import axios from "axios"
import { loginSuccess, loginFailed, loginRequest, loadUserRequest, loadUserSuccess, loadUserFailed, logoutFailed, logoutRequest, logoutSuccess, signUpFailed, signUpRequest, signUpSuccess } from "../reducers/userSlice";

export const loginMethod =  (email,password) => async dispatch =>{
    try {
        const loginURL = `${server}/login`
        dispatch(loginRequest())

        const {data} = await axios.post(
            loginURL,
            {email, password},
            {
                headers:{
                    'Content-Type': 'application/json',
                },
                withCredentials:true
            }
        )
        console.log("USer Action :: Login Method :: data ",data);

        dispatch(loginSuccess(data))
        
    } catch (error) {
        dispatch(loginFailed(error.response.data.message))
    }
}
export const registerUser =  (formdata) => async dispatch =>{
    try {
        const loginURL = `${server}/register`
        dispatch(signUpRequest())

        console.log("User Action :: SignUp Method :: formData ",formdata);

        const {data} = await axios.post(
            loginURL,
            formdata,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
            }
        )
        console.log("User Action :: SignUp Method :: data ",data);

        dispatch(signUpSuccess(data))
        
    } catch (error) {
        dispatch(signUpFailed(error.response.data.message))
    }
}

export const loadUser = () => async dispatch =>{
    try {
        const loginURL = `${server}/me`
        dispatch(loadUserRequest())

        const {data} = await axios.get(
            loginURL,
            {
                withCredentials:true
            }
        )
        console.log("USer Action :: load User Method :: data ",data);

        dispatch(loadUserSuccess(data.user))
        
    } catch (error) {
        dispatch(loadUserFailed(error.response.data.message))
    }
}
export const logoutUser = () => async dispatch =>{
    try {
        const loginURL = `${server}/logout`
        dispatch(logoutRequest())

        const {data} = await axios.get(
            loginURL,
            {
                withCredentials:true
            }
        )
        console.log("USer Action :: load User Method :: data ",data);

        dispatch(logoutSuccess(data.messager))
        
    } catch (error) {
        dispatch(logoutFailed(error.response.data.message))
    }
}