import type { STATUS } from "../enum/status.enum";

export type Order = {
    id: number;
    studentId: number;
    totalPrice: number;
    status: STATUS;
};

export type OrderItem = {
    id: number;
    menuItemId: number;
    itemPrice: number;
    quantity: number;
    orderId: number;
};