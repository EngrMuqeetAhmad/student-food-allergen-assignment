
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AppException } from 'utils/errorClass';
import { JWT_SECRET } from 'src/utils/constants_ENV';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }


    // just mimic the JWT authentication by validating the userId sent in the request body
    private async validateRequest(request: Request): Promise<boolean> {

        const token = this.extractTokenFromHeader(request)
        try {

            if (!token) {
                throw new AppException("UNAUTHORIZED")
            }

            const payload = await this.jwtService.verifyAsync(token, {
                secret: JWT_SECRET
            })

            request['user'] = payload


            return true
        } catch (error: any) {
            throw new UnauthorizedException(error.message)
        }


    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined;
    }
}

