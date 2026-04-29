import { STATUS } from "src/utils/status.enum";

export class Order {
    constructor(
        public id: number,
        public studentId: number,
        public totalPrice: number,
        public status: STATUS
    ) { }
}

export class OrderItem {
    constructor(
        public id: number,
        public menuItemId: number,
        public itemPrice: number,
        public quantity: number,
        public orderId: number
    ) { }
}