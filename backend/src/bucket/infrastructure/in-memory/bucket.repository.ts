import { BucketInterface } from "src/bucket/domain/bucket.interface";
import { Bucket, BucketItem } from "src/bucket/domain/bucket.model";
import { BucketsData } from "src/seed/bucket.seed";
import { AppException } from "utils/errorClass";

export class InMemoryBucketRepository implements BucketInterface {

    private buckets: Bucket[] = []
    private bucketItems: BucketItem[] = []
    constructor() {
        this.buckets = BucketsData
    }

    getBucketById(id: number): Bucket | undefined {
        return this.buckets.find((bucket) => bucket.id == id)
    }

    getBucketByStudentId(studentId: number): Bucket | undefined {
        return this.buckets.find((bucket) => bucket.studentId == studentId)
    }

    getBucketItemsByBucketId(bucketId: number): BucketItem[] {
        return this.bucketItems.filter((item) => item.bucketId == bucketId)
    }

    addItem(menuItemId: number, itemPrice: number, quantity: number, bucketId: number): BucketItem {

        const item: BucketItem = {
            id: this.bucketItems.length + 1,
            quantity: quantity,
            itemPrice: itemPrice,
            menuItemId: menuItemId,
            bucketId
        }

        this.bucketItems.push(item)

        return item

    }

    getItemInBucketByItemId(itemId: number): BucketItem | undefined {
        return this.bucketItems.find((item) => item.id == itemId)
    }

    removeItem(itemId: number): BucketItem {
        const item = this.getItemInBucketByItemId(itemId)
        if (!item) {
            throw new AppException("ITEM_NOT_FOUND")
        }

        this.bucketItems = this.bucketItems.filter(item => item.id !== itemId)

        return item
    }

    updateTotalPrice(priceToAdd: number, bucketId: number): Bucket {

        const bucket = this.buckets.find((bucket) => bucket.id == bucketId)
        if (!bucket) {
            throw new AppException("BUCKET_NOT_FOUND")
        }
        const newTotalPrice = bucket.totalPrice + priceToAdd
        bucket.totalPrice = newTotalPrice

        this.buckets = this.buckets.map((bucket) => {
            if (bucket.id == bucketId) {
                return {
                    ...bucket,
                    totalPrice: newTotalPrice
                };
            }
            return bucket;
        });

        return bucket
    }

}