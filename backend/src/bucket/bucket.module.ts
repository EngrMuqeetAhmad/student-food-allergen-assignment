import { Module } from '@nestjs/common';
import { BucketController } from './presentation/bucket.controller';
import { BucketService } from './application/bucket.service';
import { BUCKET_REPOSITORY } from 'src/common/tokens/token';
import { InMemoryBucketRepository } from './infrastructure/in-memory/bucket.repository';
import { ParentService } from 'src/parent/application/parent.service';
import { StudentService } from 'src/student/application/student.service';
import { MenuItemService } from 'src/menu-item/application/menu-item.service';

@Module({
  controllers: [BucketController],
  providers: [BucketService, ParentService, StudentService, MenuItemService, BucketService,
    {
      provide: BUCKET_REPOSITORY,
      useClass: InMemoryBucketRepository
    }
  ]
})
export class BucketModule { }
