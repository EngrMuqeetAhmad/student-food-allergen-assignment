import { StudentType } from "src/DB/data.types";

export const StudentsData: StudentType[] = [
    {
        id: 1,
        name: "Alice",
        parentId: 1,
        allergies: [1]
    },
    {
        id: 2,
        name: "Bob",
        parentId: 1,
        allergies: [2, 3]
    },
    {
        id: 3,
        name: "Charlie",
        parentId: 2,
        allergies: [4]
    }
]
