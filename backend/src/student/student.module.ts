import { Module } from '@nestjs/common';
import { StudentController } from './presentation/student.controller';
import { StudentService } from './application/student.service';
import { STUDENT_REPOSITORY } from 'src/common/tokens/token';
import { InMemoryStudentRepositry } from './infrastructure/in-memory/student.repository';

@Module({
  controllers: [StudentController],
  providers: [StudentService,
    {
      provide: STUDENT_REPOSITORY,
      useClass: InMemoryStudentRepositry
    }],
  exports: [StudentService]
})
export class StudentModule { }
