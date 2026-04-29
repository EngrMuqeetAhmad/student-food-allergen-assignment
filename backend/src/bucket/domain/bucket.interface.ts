import { Bucket, BucketItem } from "./bucket.model";

export interface BucketInterface {

    getBucketById(id: number): Bucket | undefined

    addItem(menuItemId: number, itemPrice: number, quantity: number, bucketId: number): BucketItem

    removeItem(itemId: number): BucketItem

    getBucketItemsByBucketId(bucketId: number): BucketItem[]

    getItemInBucketByItemId(itemId: number): BucketItem | undefined

    updateTotalPrice(priceToAdd: number, bucketId: number): Bucket

}