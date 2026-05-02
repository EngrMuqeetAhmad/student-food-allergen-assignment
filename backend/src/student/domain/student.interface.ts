import { Student } from "./student.model";

export interface StudentInterface {

    getStudentById(id: number): Student | undefined

    getStudentByUserId(userId: number): Student | undefined

}