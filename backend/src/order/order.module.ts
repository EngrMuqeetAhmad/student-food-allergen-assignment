import { Module } from '@nestjs/common';
import { OrderService } from './application/order.service';
import { ORDER_REPOSITORY } from 'src/common/tokens/token';
import { InMemoryOrderRepository } from './infrastructure/in-memory/order.repository';
import { OrderController } from './presentation/order.controller';
import { MenuItemService } from 'src/menu-item/application/menu-item.service';
import { BucketService } from 'src/bucket/application/bucket.service';
import { StudentService } from 'src/student/application/student.service';
import { ParentService } from 'src/parent/application/parent.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, MenuItemService, BucketService, StudentService, ParentService, {
    provide: ORDER_REPOSITORY,
    useClass: InMemoryOrderRepository
  }],
})
export class OrderModule { }
