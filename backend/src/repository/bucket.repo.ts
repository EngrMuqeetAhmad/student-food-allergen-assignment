import { BucketType, OrderItemType } from "src/DB/data.types";
import { AppException } from "utils/errorClass";
import { Order } from "./order.repo";
import { Menu } from "./menu.repo";
import { Parents } from "./parent.repo";
import { Student } from "./student.repo";
import { HttpException } from "@nestjs/common";


export class Bucket {
    private static instance: null | Bucket = null;

    private buckets: BucketType[] = [];
    // we will add this during user creation
    private constructor(buckets?: BucketType[]) {
        this.buckets = buckets || [];
    }

    public static getInstance(buckets?: BucketType[]): Bucket {
        if (this.instance == null) {
            this.instance = new Bucket(buckets || []);
        }
        return this.instance;
    }

    public getBucketById(id: number): BucketType {
        try {
            const bucket = this.buckets.find((bucket: BucketType) => bucket.id == id);
            if (!bucket) {
                throw new Error("BUCKET_NOT_FOUND")
            }
            return bucket

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

    public getBucketByStudentId(studentId: number): BucketType {
        try {

            const bucket = this.buckets.find((bucket: BucketType) => bucket.studnetId == studentId);
            if (!bucket) {
                throw new Error("BUCKET_NOT_FOUND")
            }
            return bucket

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

    public getTotalPriceofBucket(studentId: number): number {
        try {
            const bucket = this.getBucketByStudentId(studentId);
            return bucket.totalPrice

        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

    public updateTotalPriceOfBucket(studentId: number, price: number): BucketType {
        try {
            const bucket = this.getBucketByStudentId(studentId);
            bucket.totalPrice += price;

            this.buckets = this.buckets.map((bucket: BucketType) => {
                if (bucket.studnetId == studentId) {
                    bucket.totalPrice = price;
                }
                return bucket
            });
            return this.getBucketByStudentId(studentId)
        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

    public resetBucket(studentId: number): BucketType {
        try {
            const orders = Order.getInstance();
            const bucket = this.getBucketByStudentId(studentId);

            orders.purgeOrdersByBucketId(bucket.id)

            this.buckets = this.buckets.map((bucket: BucketType) => {
                if (bucket.studnetId == studentId) {
                    // bucket.status = BUCKET_STATUS_ENUM.EMPTY;
                    bucket.totalPrice = 0;
                    // bucket.remainingBucketTime = 0;
                }
                return bucket
            });
            return this.getBucketByStudentId(studentId)
        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }

    ////////
    public orderBucket(studentId: number): BucketType {
        try {
            const student = Student.getInstance().getStudentById(studentId)

            const bucket = this.getBucketByStudentId(studentId);
            const OrderInstance = Order.getInstance();
            const itemsInBucket = OrderInstance.getOrdersByBucketId(bucket.id);
            if (itemsInBucket.length == 0) {
                throw new AppException("BUCKET_EMPTY")
            }

            let unavailableMenuItems: string[] = []

            itemsInBucket.forEach((orderItem: OrderItemType) => {
                const menuItem = Menu.getInstance().getMenuItemById(orderItem.menuItemId)
                if (!menuItem.available) {
                    unavailableMenuItems.push(menuItem.name)
                }
            })

            if (unavailableMenuItems.length > 0) {
                throw new AppException("MENU_ITEM_UNAVAILABLE", { cause: unavailableMenuItems })
            }


            const ParentInstance = Parents.getInstance()
            const parent = ParentInstance.getParentById(student.parentId)
            ParentInstance.lockParentAccount(parent.id)
            if (bucket.totalPrice > parent.balance) {
                throw new Error("INSUFFICIENT_BALANCE")
            }

            parent.balance -= bucket.totalPrice;
            OrderInstance.purgeOrdersByBucketId(bucket.id)
            const resetBucket = this.resetBucket(studentId)
            ParentInstance.unLockParentAccount(parent.id)
            return resetBucket
        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }
    }
}