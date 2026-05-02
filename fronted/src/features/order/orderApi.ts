import { api } from "../../api/api";
import type { Order, OrderItem } from "./types/order.types";

export const orderApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getOrdersByStudent: builder.query<Order[], number>({
            query: (studentId) =>
                `/order/orders-by-student/${studentId}`,
        }),

        getItemsByOrderId: builder.query<OrderItem[], number>({
            query: (orderId) =>
                `/order/items-by-order/${orderId}`,
        }),

        getOrderById: builder.query<Order, number>({
            query: (orderId) =>
                `/order/${orderId}`,
        }),

        createOrder: builder.mutation<
            Order,
            { studentId: number; bucketId: number }
        >({
            query: (body) => ({
                url: "/order/",
                method: "POST",
                body,
            }),
        }),

        completeOrder: builder.mutation<
            Order,
            { orderId: number; studentId: number }
        >({
            query: (body) => ({
                url: "/order/complete",
                method: "POST",
                body,
            }),
        }),

    }),
});

export const {
    useGetItemsByOrderIdQuery,
    useCompleteOrderMutation,
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetOrdersByStudentQuery
} = orderApi