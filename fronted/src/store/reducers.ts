import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { api } from "../api/api";
import { bucketReducer } from "../features/bucket/bucketSlice";


export const rootReducer = combineReducers({
    auth: authReducer,
    bucket: bucketReducer,
    [api.reducerPath]: api.reducer
})
