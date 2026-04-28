import { apiClient } from "../../api/client";

export interface AddOrderDTO {
    menuItemId: number;
    quantity: number;
    studentId: number;
}

export interface RemoveOrderItemDTO {
    menuItemId: number;
    studentId: number;
}

export interface CompleteOrderDTO {
    studentId: number;
}

const OrderService = {

    async addItem(payload: AddOrderDTO) {
        const response = await apiClient.post("/order/add-item", payload);
        return response.data;
    },

    async removeItem(payload: RemoveOrderItemDTO) {
        const response = await apiClient.delete("/order/remove-item", {
            data: payload,
        });
        return response.data;
    },

    async completeOrder(payload: CompleteOrderDTO) {
        const response = await apiClient.post("/order/complete-order", payload);
        return response.data;
    },


    async listOrderItems(studentId: number) {
        const response = await apiClient.get("/order/list-order-items", {
            params: {
                studentId: studentId,
            }
        });
        return response.data;
    }

};

export default OrderService;