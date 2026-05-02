import { api } from "../../api/api";
import type { LoginDTO } from "./types/auth.types";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: LoginDTO) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    email: body.email,
                    password: body.password
                }
            })
        })
    })
})

export const { useLoginMutation } = authApi