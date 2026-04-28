import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AddOrderDTO } from './dto/addOrder.dto';
import { DB } from 'src/DB/db';
import { CompleteOrderDTO } from './dto/completeOrder.dto';
import { RemoveOrderItemDTO } from './dto/removeOrderItem.dto';
import { AppException } from 'utils/errorClass';

@Controller('order')
export class OrderController {
    private OrderInstance = DB.getInstance().orderInstance;
    private BucketInstance = DB.getInstance().bucketInstance;

    @Post('/add-item')
    @UseGuards(AuthGuard)
    addItemToOrder(@Body() addOrderItemDto: AddOrderDTO) {
        return this.OrderInstance.addOrderItem(addOrderItemDto.menuItemId, addOrderItemDto.quantity, addOrderItemDto.studentId)
    }

    @Delete('/remove-item')
    @UseGuards(AuthGuard)
    removeOrderItem(@Body() removeOrderItemDto: RemoveOrderItemDTO) {
        return this.OrderInstance.removeOrderItem(removeOrderItemDto.menuItemId)
    }

    @Get('/list-order-items')
    @UseGuards(AuthGuard)
    listOrderItems(@Query('studentId') studentId: string) {

        const bucket = this.BucketInstance.getBucketByStudentId(Number(studentId))
        if (!bucket) {
            throw new AppException("BUCKET_NOT_FOUND")
        }
        const data = this.OrderInstance.getOrdersByBucketId(bucket.id)

        let items: any[] = []
        for (let orderItem of data) {
            const menuItem = DB.getInstance().menuInstance.getMenuItemById(orderItem.menuItemId)
            items.push({
                id: orderItem.id,
                menuItemId: orderItem.menuItemId,
                name: menuItem.name,
                price: menuItem.price,
                quantity: orderItem.quantity,
                totalPrice: menuItem.price * orderItem.quantity
            })
        }
        return items
    }

    @Post('/complete-order')
    @UseGuards(AuthGuard)
    completeOrder(@Body() completeOrderDto: CompleteOrderDTO) {
        return this.BucketInstance.orderBucket(completeOrderDto.studentId)
    }

}
