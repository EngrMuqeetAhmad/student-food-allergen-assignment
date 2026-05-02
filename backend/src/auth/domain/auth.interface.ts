import { User } from "./user.model"


export interface AuthInterface {

    getUserByEmail(email: string): User | undefined

}