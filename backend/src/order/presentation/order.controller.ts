import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from '../application/order.service';

@Controller('order')
export class OrderController {

    constructor(
        private orderService: OrderService
    ) { }


    @Get('/orders-by-student/:studentId')
    getOrdersByStudent(@Param('studentId') studentId: number) {
        return this.orderService.getAllOrdersByStudent(studentId)
    }

    @Get('/items-by-order/:orderId')
    getItemsByOrderId(@Param('orderId') orderId: number) {
        return this.orderService.getItemsByOrderId(orderId)
    }

    @Get('/:orderId')
    getOrderById(@Param('orderId') orderId: number) {
        return this.orderService.getOrderById(orderId)
    }

    @Post('/')
    createOrder(@Body() body: { studentId: number, bucketId: number }) {
        return this.orderService.createOrder(body.studentId, body.bucketId)
    }

    @Post('/complete')
    completeOrder(@Body() body: { orderId: number, studentId: number }) {
        return this.orderService.completeOrder(body.orderId, body.studentId)
    }

}
