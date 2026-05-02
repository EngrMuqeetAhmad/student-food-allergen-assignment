import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ROLE } from 'src/utils/role.enum';


export class RolesGuard implements CanActivate {
    constructor() { }

    private reflector = new Reflector();
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<ROLE[]>(ROLES_KEY, context.getHandler())
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('Access Denied: No user information');
        }
        console.log("user in roles guard", user)
        const hasRole = roles.some(role => user.role == role);
        if (!hasRole) {
            throw new ForbiddenException('Access Denied: Insufficient role');
        }

        return true;
    }

}