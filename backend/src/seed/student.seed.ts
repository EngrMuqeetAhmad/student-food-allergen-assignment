import { Student } from "src/student/domain/student.model";

export const StudentsData: Student[] = [
    {
        id: 1,
        parentId: 1,
        allergies: [1],
        userId: 1
    },
    {
        id: 2,
        parentId: 1,
        allergies: [2, 3],
        userId: 2


    },
    {
        id: 3,
        parentId: 2,
        allergies: [4],
        userId: 3

    }
]
