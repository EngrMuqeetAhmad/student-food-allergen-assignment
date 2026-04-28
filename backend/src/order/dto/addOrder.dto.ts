import { IsNumber, Min } from "class-validator";


export class AddOrderDTO {

    @IsNumber()
    menuItemId!: number;

    @IsNumber()
    @Min(1)
    quantity!: number;

    @IsNumber()
    studentId!: number;

}