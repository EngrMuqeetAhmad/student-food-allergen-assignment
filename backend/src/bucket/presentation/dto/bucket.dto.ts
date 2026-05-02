import { IsNumber } from "class-validator";

export class AddItemToBucketDTO {
    @IsNumber()
    menuItemId!: number


    @IsNumber()
    quantity!: number


    @IsNumber()
    bucketId!: number

}

export class DeleteItemFromBucketDTO {
    @IsNumber()
    itemId!: number

    @IsNumber()
    bucketId!: number
}