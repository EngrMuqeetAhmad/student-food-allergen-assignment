export type Bucket = {
    id: number;
    studentId: number;
    totalPrice: number;
};

export type BucketItem = {
    id: number;
    bucketId: number;
    quantity: number;
    itemPrice: number;
    menuItemId: number;
};

export type BucketState = {
    bucketId: number | null,
    studentId: number | null,
    totalPrice: number | null
}