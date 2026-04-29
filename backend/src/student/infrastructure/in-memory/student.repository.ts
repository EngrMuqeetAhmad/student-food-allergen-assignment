import { StudentInterface } from "src/student/domain/student.interface";
import { Student } from "src/student/domain/student.model";

export class InMemoryStudentRepositry implements StudentInterface {

    private students: Student[] = []

    constructor() { }

    getStudentById(id: number): Student | undefined {
        return this.students.find((student) => student.id == id)
    }

    getAllStudents(): Student[] {
        return this.students
    }

}