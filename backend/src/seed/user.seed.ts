import { User } from "src/auth/domain/user.model";
import { ROLE } from "src/utils/role.enum";

export const UserData: User[] = [
    {
        id: 1,
        name: "Alice",
        email: "alice@gmail.com",
        password: "12345678",
        role: ROLE.STUDENT
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@gmail.com",
        password: "12345678",
        role: ROLE.STUDENT
    },
    {
        id: 3,
        name: "Charlie",
        email: "charlie@gmail.com",
        password: "12345678",
        role: ROLE.STUDENT
    },
    {
        id: 4,
        name: "Parent 1",
        email: "parent1@gmail.com",
        password: "12345678",
        role: ROLE.PARENT
    },
    {
        id: 5,
        name: "Parent 2",
        email: "parent2@gmail.com",
        password: "12345678",
        role: ROLE.PARENT
    }
]
