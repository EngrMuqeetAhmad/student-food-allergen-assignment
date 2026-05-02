import { User } from "src/auth/domain/user.model"


export type LoginReturnType = {
    user: Omit<typeof User, "password">
    token: string
}

