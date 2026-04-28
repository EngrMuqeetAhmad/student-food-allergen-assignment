import { HttpException } from "@nestjs/common";
import { ERRORS } from "./errors";

export class AppException extends HttpException {
    constructor(code: keyof typeof ERRORS, details?: any) {
        super(
            {
                code,
                message: ERRORS[code].message,
                details
            },
            ERRORS[code].status
        );
    }
}

