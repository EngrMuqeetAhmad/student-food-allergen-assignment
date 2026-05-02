import { Module } from '@nestjs/common';
import { OrderService } from './application/order.service';
import { ORDER_REPOSITORY } from 'src/common/tokens/token';
import { InMemoryOrderRepository } from './infrastructure/in-memory/order.repository';
import { OrderController } from './presentation/order.controller';
import { MenuItemService } from 'src/menu-item/application/menu-item.service';
import { MenuItemModule } from 'src/menu-item/menu-item.module';
import { BucketModule } from 'src/bucket/bucket.module';
import { StudentModule } from 'src/student/student.module';
import { ParentModule } from 'src/parent/parent.module';

@Module({
  imports: [MenuItemModule, BucketModule, StudentModule, ParentModule],
  controllers: [OrderController],
  providers: [OrderService, {
    provide: ORDER_REPOSITORY,
    useClass: InMemoryOrderRepository
  }],
  exports: [OrderService]
})
export class OrderModule { }
