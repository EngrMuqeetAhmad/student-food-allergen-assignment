import { StudentsData } from "src/seed/student.seed";
import { StudentInterface } from "src/student/domain/student.interface";
import { Student } from "src/student/domain/student.model";

export class InMemoryStudentRepositry implements StudentInterface {

    private students: Student[] = []

    constructor() {

        this.students = StudentsData

    }

    getStudentById(id: number): Student | undefined {
        return this.students.find((student) => student.id == id)
    }

    getStudentByUserId(userId: number): Student | undefined {
        return this.students.find((student) => student.userId == userId)
    }

}