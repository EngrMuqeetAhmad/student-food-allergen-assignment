import { Student } from "./student.model";

export interface StudentInterface {

    getStudentById(id: number): Student | undefined
    getAllStudents(): Student[]

}