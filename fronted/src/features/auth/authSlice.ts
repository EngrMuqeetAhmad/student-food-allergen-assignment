import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types/auth.types";

const initialState: AuthState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token

        },
        onLogout: (state) => {
            state.user = null;
            state.token = null
        }
    }
})

export const { onLogin, onLogout } = authSlice.actions

export const authReducer = authSlice.reducer