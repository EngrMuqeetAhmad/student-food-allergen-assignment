import { Module } from '@nestjs/common';
import { BucketController } from './presentation/bucket.controller';
import { BucketService } from './application/bucket.service';
import { BUCKET_REPOSITORY } from 'src/common/tokens/token';
import { InMemoryBucketRepository } from './infrastructure/in-memory/bucket.repository';
import { ParentModule } from 'src/parent/parent.module';
import { StudentModule } from 'src/student/student.module';
import { MenuItemModule } from 'src/menu-item/menu-item.module';

@Module({
  imports: [ParentModule, StudentModule, MenuItemModule],
  controllers: [BucketController],
  providers: [BucketService,
    {
      provide: BUCKET_REPOSITORY,
      useClass: InMemoryBucketRepository
    }
  ],
  exports: [BucketService]
})
export class BucketModule { }
