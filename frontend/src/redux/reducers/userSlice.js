import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    isAuthenticated : false,
    user : null,
    message : null,
    error: null


}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

        loginRequest:(state,action)=>{
            state.loading = true;
        },

        loginSuccess:(state, action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            console.log("login Success :: User Reducer ::", action.payload);
            state.user = action.payload.user
            state.message = action.payload.message
        },

        loginFailed:(state, action) =>{
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        signUpRequest:(state,action)=>{
            state.loading = true;
        },

        signUpSuccess:(state, action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            console.log("login Success :: User Reducer ::", action.payload);
            state.user = action.payload.user
            
            state.message = action.payload.message
        },

        signUpFailed:(state, action) =>{
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        logoutRequest:(state,action)=>{
            state.loading = true;
        },

        logoutSuccess:(state, action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null
            
            state.message = action.payload
        },

        logoutFailed:(state, action) =>{
            state.loading = false;
             state.isAuthenticated = true;
            // state.user = null;
            state.error = action.payload;
        },
        loadUserRequest:(state,action)=>{
            state.loading = true;
        },

        loadUserSuccess:(state, action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload
        },

        loadUserFailed:(state, action) =>{
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        clearError:(state)=>{
            state.error = null;
        },

        clearMessage:(state)=>{
            state.message = null
        }

    }
})

export const {loginRequest, loginSuccess, loginFailed, clearError, clearMessage, loadUserFailed, loadUserRequest, loadUserSuccess, logoutFailed, logoutRequest, logoutSuccess, signUpFailed, signUpSuccess, signUpRequest} = userSlice.actions;

export default userSlice.reducer;