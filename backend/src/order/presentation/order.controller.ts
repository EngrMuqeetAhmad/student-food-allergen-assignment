import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from '../application/order.service';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/utils/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('order')
export class OrderController {

    constructor(
        private orderService: OrderService
    ) { }


    @Get('/orders-by-student/:studentId')
    @Roles(ROLE.STUDENT, ROLE.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getOrdersByStudent(@Param('studentId') studentId: number) {
        return this.orderService.getAllOrdersByStudent(studentId)
    }

    @Get('/items-by-order/:orderId')
    @Roles(ROLE.STUDENT, ROLE.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getItemsByOrderId(@Param('orderId') orderId: number) {
        return this.orderService.getItemsByOrderId(orderId)
    }

    @Get('/:orderId')
    @Roles(ROLE.STUDENT, ROLE.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getOrderById(@Param('orderId') orderId: number) {
        return this.orderService.getOrderById(orderId)
    }

    @Post('/')
    @Roles(ROLE.STUDENT)
    @UseGuards(AuthGuard, RolesGuard)
    createOrder(@Body() body: { studentId: number, bucketId: number }) {
        return this.orderService.createOrder(body.studentId, body.bucketId)
    }

    @Post('/complete')
    @Roles(ROLE.STUDENT)
    @UseGuards(AuthGuard, RolesGuard)
    completeOrder(@Body() body: { orderId: number, studentId: number }) {
        return this.orderService.completeOrder(body.orderId, body.studentId)
    }

}
