import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{

        updateProfileRequest:(state)=>{
            state.loading = true
        },
        updateProfileSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        updateProfileFailed:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        updateProfilePictureRequest:(state)=>{
            state.loading = true
        },
        updateProfilePictureSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        updateProfilePictureFailed:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        changePasswordRequest:(state)=>{
            state.loading = true
        },
        changePasswordSuccess:(state,action)=>{
            state.loading = false
            state.message = action.payload
        },
        changePasswordFailed:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        clearError:(state)=>{
            state.error = null;
        },

        clearMessage:(state)=>{
            state.message = null
        }


    }
})

export const {updateProfileFailed, updateProfileRequest, updateProfileSuccess, updateProfilePictureFailed, updateProfilePictureSuccess, updateProfilePictureRequest, changePasswordFailed, changePasswordSuccess, changePasswordRequest, clearError, clearMessage } = profileSlice.actions;

export default profileSlice.reducer;