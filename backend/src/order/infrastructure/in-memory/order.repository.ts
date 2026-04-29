import { OrderInterface } from "src/order/domain/order.iterface";
import { Order, OrderItem } from "src/order/domain/order.model";
import { STATUS } from "src/utils/status.enum";
import { AppException } from "utils/errorClass";

export class InMemoryOrderRepository implements OrderInterface {

    private orders: Order[] = [];
    private orderItems: OrderItem[] = [];

    constructor() { }

    getAllOrders(studentId: number): Order[] {
        return this.orders.filter((order) => order.studentId == studentId)
    }

    getOrderById(orderId: number): Order | undefined {
        const order = this.orders.find((order) => order.id == orderId)
        return order
    }

    getItemsByOrderId(orderId: number): OrderItem[] {
        const orderItems = this.orderItems.filter((item) => item.orderId == orderId)
        return orderItems
    }

    createOrder(studentId: number): Order {
        const newOrder: Order = {
            id: this.orders.length + 1,
            studentId,
            totalPrice: 0,
            status: STATUS.PENDING
        }

        this.orders.push(newOrder)
        return newOrder
    }

    addItemToOrder(menuItemId: number, itemPrice: number, quantity: number, orderId: number): OrderItem {
        const newItem = {
            id: this.orderItems.length + 1,
            menuItemId,
            itemPrice,
            quantity,
            orderId
        }
        this.orderItems.push(newItem)
        return newItem
    }


    updateStatusOfOrder(orderId: number, status: STATUS): Order {
        const order = this.getOrderById(orderId)
        if (!order) {
            throw new AppException("ORDER_NOT_FOUND")
        }
        this.orders = this.orders.map((order) => {
            if (order.id == orderId) {
                return {
                    ...order,
                    status: status

                }
            }
            return order
        })

        order.status = status
        return order
    }
}