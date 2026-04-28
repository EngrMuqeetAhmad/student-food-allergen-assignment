import { HttpException } from "@nestjs/common";
import { StudentType } from "src/DB/data.types";
import { AppException } from "utils/errorClass";

export class Student {
    private static instance: null | Student = null;

    private students: StudentType[] = [];

    private constructor(students?: StudentType[]) {
        this.students = students || [];
    }

    public static getInstance(students?: StudentType[]): Student {
        if (this.instance == null) {
            this.instance = new Student(students || []);
        }
        return this.instance;
    }

    public getStudentById(id: number): StudentType {
        try {
            const student = this.students.find((student: StudentType) => student.id == id);
            if (!student) {
                throw new Error("USER_NOT_FOUND")
            }
            return student
        } catch (error: any) {
            throw new HttpException(error.message, error.status)

        }
    }

    public getAllStudents(): StudentType[] {
        return this.students;
    }
}
