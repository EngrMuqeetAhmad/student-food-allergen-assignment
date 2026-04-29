import { Inject, Injectable } from '@nestjs/common';
import { STUDENT_REPOSITORY } from 'src/common/tokens/token';
import type { StudentInterface } from '../domain/student.interface';

@Injectable()
export class StudentService {

    constructor(
        @Inject(STUDENT_REPOSITORY)
        private studentRepository: StudentInterface
    ) { }

    findStudentById(id: number) {
        return this.studentRepository.getStudentById(id)
    }

    findAllStudents() {
        return this.studentRepository.getAllStudents()
    }

}
