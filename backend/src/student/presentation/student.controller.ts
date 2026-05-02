import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StudentService } from '../application/student.service';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/utils/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) { }

    @Get(':id')
    @Roles(ROLE.STUDENT)
    @UseGuards(AuthGuard, RolesGuard)
    findStudentById(@Param('id') id: number) {
        return this.studentService.findStudentById(id)
    }

}
