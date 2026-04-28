import { IsNumber } from "class-validator";

export class CompleteOrderDTO {
    @IsNumber()
    studentId!: number;

}