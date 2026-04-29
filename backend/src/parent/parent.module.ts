import { Module } from '@nestjs/common';
import { ParentController } from './presentation/parent.controller';
import { ParentService } from './application/parent.service';
import { PARENT_REPOSITORY } from 'src/common/tokens/token';
import { InMemoryParentRepository } from './infrastructure/in-memory/parent.repository';

@Module({
  controllers: [ParentController],
  providers: [ParentService, {
    provide: PARENT_REPOSITORY,
    useClass: InMemoryParentRepository
  }]
})
export class ParentModule { }
