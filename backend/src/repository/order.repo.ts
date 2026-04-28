import { OrderItemType } from "src/DB/data.types";
import { AppException } from "utils/errorClass";
import { Menu } from "./menu.repo";
import { Ingredients } from "./ingredient.repo";
import { Parents } from "./parent.repo";
import { Student } from "./student.repo";
import { Bucket } from "./bucket.repo";
import { Utils } from "./utils.repo";
import { HttpException } from "@nestjs/common/exceptions/http.exception";


export class Order {
    private static instance: null | Order = null;

    private orders: OrderItemType[] = [];

    private constructor(orders?: OrderItemType[]) {
        this.orders = orders || [];
    }

    public static getInstance(orders?: OrderItemType[]): Order {
        if (this.instance == null) {
            this.instance = new Order(orders || []);
        }
        return this.instance;
    }

    public purgeOrdersByBucketId(bucketId: number): boolean {
        this.orders = this.orders.filter((order: OrderItemType) => order.bucketId !== bucketId);
        return true
    }

    public getOrdersByBucketId(bucketId: number): OrderItemType[] {
        return this.orders.filter((order: OrderItemType) => order.bucketId == bucketId);
    }

    public getOrderItemById(orderItemId: number): OrderItemType {
        try {
            const orderItem = this.orders.find((order: OrderItemType) => order.id == orderItemId);
            if (!orderItem) {
                throw new Error("ORDER_NOT_FOUND")
            }
            return orderItem

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }


    /////
    public addOrderItem(menuItemId: number, quantity: number, studentId: number): OrderItemType {
        try {

            if (quantity < 0) {
                throw new Error("INVALID_QUANTITY")
            }

            const menuItem = Menu.getInstance().getMenuItemById(menuItemId)

            const student = Student.getInstance().getStudentById(studentId)

            const allergenPresent = Utils.getInstance().allergiesOverlap(student.allergies, menuItem.ingredients)
            if (allergenPresent.length > 0) {
                const allergenNames: string[] = []

                allergenPresent.forEach((allergenId: number) => {
                    const ingredient = Ingredients.getInstance().getIngredientById(allergenId)
                    allergenNames.push(ingredient.name)
                })
                throw new AppException("ALLERGEN_PRESENT", { cause: allergenNames })
            }

            const bucket = Bucket.getInstance().getBucketByStudentId(studentId)

            let newAmount = menuItem.price * quantity;

            let newTotalAmount = bucket.totalPrice + newAmount;
            const ParentInstance = Parents.getInstance()
            const parent = ParentInstance.getParentById(student.parentId)

            //mimicking transaction by locking the parent account before checking balance and adding order item, and unlocking it after adding order item. In real world scenario we will use database transactions for this purpose.
            ParentInstance.lockParentAccount(parent.id)
            if (newTotalAmount > parent.balance) {
                throw new Error("INSUFFICIENT_BALANCE")
            }


            const orderItem: OrderItemType = {
                id: this.orders.length + 1,
                bucketId: bucket.id,
                menuItemId,
                quantity
            }
            this.orders.push(orderItem)
            Bucket.getInstance().updateTotalPriceOfBucket(studentId, newAmount)
            ParentInstance.unLockParentAccount(parent.id)
            //
            return orderItem

        } catch (error: any) {
            console.log(error)
            throw new HttpException(error.message, error.status)
        }

    }

    public removeOrderItem(orderItemId: number): OrderItemType {
        try {
            const orderItem = this.getOrderItemById(orderItemId);

            const menuItem = Menu.getInstance().getMenuItemById(orderItem.menuItemId)

            const bucket = Bucket.getInstance().getBucketById(orderItem.bucketId)
            //
            const newQuantity = orderItem.quantity * -1;
            const amountToDeduct = menuItem.price * newQuantity;
            //
            Bucket.getInstance().updateTotalPriceOfBucket(bucket.studnetId, amountToDeduct)

            this.orders = this.orders.filter((order: OrderItemType) => order.id !== orderItemId);
            orderItem.quantity = 0;
            return orderItem

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

    // public updateOrderItem(orderItemId: number, quantity: number, studentId: number): OrderItemType {
    //     try {
    //         if (quantity < 0) {
    //             throw new Error("INVALID_QUANTITY")
    //         }
    //         const orderItem = this.getOrderItemById(orderItemId);

    //         const menuItem = Menu.getInstance().getMenuItemById(orderItem.menuItemId)

    //         const bucket = Bucket.getInstance().getBucketByStudentId(studentId)
    //         const newQuantity = quantity - orderItem.quantity;
    //         const newAmount = menuItem.price * newQuantity;
    //         const newTotalAmount = bucket.totalPrice + newAmount;
    //         // init transaction
    //         const ParentInstance = Parents.getInstance()

    //         const student = Student.getInstance().getStudentById(studentId)
    //         const parent = ParentInstance.getParentById(student.parentId)
    //         ParentInstance.lockParentAccount(parent.id)

    //         if (newTotalAmount > parent.balance) {
    //             throw new Error("INSUFFICIENT_BALANCE")
    //         }

    //         this.orders = this.orders.map((order: OrderItemType) => {
    //             if (order.id == orderItemId) {
    //                 order.quantity = quantity;
    //             }
    //             return order
    //         });
    //         Bucket.getInstance().updateTotalPriceOfBucket(studentId, newAmount)
    //         ParentInstance.unLockParentAccount(parent.id)
    //         //
    //         return this.getOrderItemById(orderItemId)

    //     } catch (error: any) {
    //         throw new AppException(error.message)
    //     }
    // }
}