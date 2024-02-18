import {configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice.js'
import profileReducer from './reducers/profileSlice.js'

export const server = "http://localhost:8000/api/v1"

export const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer
    }
})