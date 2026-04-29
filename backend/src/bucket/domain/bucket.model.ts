import { ItemType } from "src/types/item.types";

export class Bucket {
    constructor(
        public id: number,
        public studentId: number,
        public totalPrice: number
    ) {

    }
}

export class BucketItem {
    constructor(
        public id: number,
        public bucketId: number,
        public quantity: number,
        public itemPrice: number,
        public menuItemId: number
    ) { }
}