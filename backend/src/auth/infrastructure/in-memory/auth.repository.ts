import { AuthInterface } from "src/auth/domain/auth.interface";
import { User } from "src/auth/domain/user.model";
import { UserData } from "src/seed/user.seed";

export class InMemoryAuthRepository implements AuthInterface {


    private users: User[] = []

    constructor() {

        this.users = UserData

    }

    getUserByEmail(email: string): User | undefined {

        const user = this.users.find((user) => user.email.trim() == email.trim())
        return user

    }


}