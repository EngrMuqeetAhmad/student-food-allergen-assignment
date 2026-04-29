import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from '../application/student.service';

@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) { }

    @Get('all')
    findAll() {
        return this.studentService.findAllStudents();
    }

    @Get(':id')
    findStudentById(@Param('id') id: number) {
        return this.studentService.findStudentById(id)
    }

}
