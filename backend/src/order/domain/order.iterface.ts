import { STATUS } from "src/utils/status.enum";
import { Order, OrderItem } from "./order.model";

export interface OrderInterface {

    getAllOrders(studentId: number): Order[]

    getOrderById(orderId: number): Order | undefined

    getItemsByOrderId(orderId: number): OrderItem[]

    createOrder(studentId: number): Order

    addItemToOrder(menuItemId: number, itemPrice: number, quantity: number, orderId: number): OrderItem


    updateStatusOfOrder(orderId: number, status: STATUS): Order

}