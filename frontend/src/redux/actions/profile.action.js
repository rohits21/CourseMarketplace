import { changePasswordFailed, changePasswordRequest, changePasswordSuccess, updateProfileFailed, updateProfilePictureFailed, updateProfilePictureRequest, updateProfilePictureSuccess, updateProfileRequest, updateProfileSuccess } from "../reducers/profileSlice";
import { server } from "../store";
import axios from 'axios'

export const updateProfile = (name, email) => async (dispatch) =>{
    try {
        const url = `${server}/updateprofile`

        dispatch(updateProfileRequest())

        const {data} = await axios.put(
            url,
            {name, email},
            {
                headers:{
                    'Content-Type': 'application/json',
                },
                withCredentials:true
            }
        )

        dispatch(updateProfileSuccess(data.message))
        
    } catch (error) {

        dispatch(updateProfileFailed(error.response.data.message ))
        
    }
}
export const changePassword = (oldpassword, newpassword) => async (dispatch) =>{
    try {
        const url = `${server}/changepassword`

        dispatch(changePasswordRequest())

        const {data} = await axios.put(
            url,
            {oldpassword, newpassword},
            {
                headers:{
                    'Content-Type': 'application/json',
                },
                withCredentials:true
            }
        )

        dispatch(changePasswordSuccess(data.message))
        
    } catch (error) {

        dispatch(changePasswordFailed(error.response.data.message ))
        
    }
}
export const updateProfilePicture = (formData) => async (dispatch) =>{
    try {
        const url = `${server}/updateprofilepicture`

        dispatch(updateProfilePictureRequest())

        const {data} = await axios.put(
            url,
            formData,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials:true
            }
        )

        dispatch(updateProfilePictureSuccess(data.message))
        
    } catch (error) {

        dispatch(updateProfilePictureFailed(error.response.data.message ))
        
    }
}

