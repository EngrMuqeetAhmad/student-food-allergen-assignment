import { IsNumber } from "class-validator";

export class RemoveOrderItemDTO {

    @IsNumber()
    menuItemId!: number;

    @IsNumber()
    studentId!: number;

}