import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/common/tokens/token';
import type { OrderInterface } from '../domain/order.iterface';
import { MenuItemService } from 'src/menu-item/application/menu-item.service';
import { AppException } from 'utils/errorClass';
import { BucketService } from 'src/bucket/application/bucket.service';
import { StudentService } from 'src/student/application/student.service';
import { ParentService } from 'src/parent/application/parent.service';
import { STATUS } from 'src/utils/status.enum';

@Injectable()
export class OrderService {

    constructor(
        @Inject(ORDER_REPOSITORY)
        private orderRepository: OrderInterface,
        private menuItemService: MenuItemService,
        private bucketService: BucketService,
        private studentService: StudentService,
        private parentService: ParentService
    ) { }

    getAllOrdersByStudent(studentId: number) {
        return this.orderRepository.getAllOrders(studentId)
    }

    getItemsByOrderId(orderId: number) {
        return this.orderRepository.getItemsByOrderId(orderId)
    }



    getOrderById(id: number) {
        return this.orderRepository.getOrderById(id)
    }

    createOrder(studentId: number, bucketId: number) {
        try {

            const order = this.orderRepository.createOrder(studentId)

            if (!order) {
                throw new AppException("ORDER_NOT_CREATED")
            }

            const bucketItems = this.bucketService.getBucketItemByBucketId(bucketId)
            if (bucketItems.length <= 0) {
                throw new AppException("BUCKET_EMPTY")
            }

            bucketItems.forEach((item) => {
                this.addItemToOrder(item.menuItemId, item.quantity, order.id)
            })

            return order
        } catch (err: any) {
            throw new HttpException(err.message, err.status)
        }
    }

    private addItemToOrder(menuItemId: number, quantity: number, orderId: number) {

        try {
            const item = this.menuItemService.findById(menuItemId);
            if (!item) {
                throw new AppException("ITEM_NOT_FOUND")
            }
            if (!item.available) {
                throw new AppException("MENU_ITEM_NOT_AVAILABLE")
            }

            const newItem = this.orderRepository.addItemToOrder(item.id, item.price, quantity, orderId)
            if (!newItem) {
                throw new AppException("INTERNAL_ERROR")
            }

            return newItem

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }


    completeOrder(orderId: number, studentId: number) {
        try {

            const student = this.studentService.findStudentById(studentId)
            if (!student) {
                throw new AppException("USER_NOT_FOUND")
            }
            let order = this.getOrderById(orderId)
            if (!order) {
                throw new AppException("ORDER_NOT_FOUND")
            }
            let parent = this.parentService.getParentById(student.parentId)
            if (!parent) {
                throw new AppException("PARENT_NOT_FOUND")
            }


            if (order.totalPrice > parent.balance) {
                throw new AppException("INSUFFICIENT_BALANCE")
            }

            parent = this.parentService.updateParentBalance(order.totalPrice, parent.id)


            order = this.orderRepository.updateStatusOfOrder(order.id, STATUS.COMPLETED)

            return order

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

}
