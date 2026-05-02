import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { api } from "../api/api";


export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch