
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DB } from 'src/DB/db';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request);
    }
}

// just mimic the JWT authentication by validating the userId sent in the request body
function validateRequest(request: any): boolean {

    const UserInstance = DB.getInstance().studentInstance

    const userId = request?.query?.studentId || request?.body?.studentId || request?.body?.userId

    const user = UserInstance.getStudentById(userId)

    if (!user) {
        return false
    }
    return true
}