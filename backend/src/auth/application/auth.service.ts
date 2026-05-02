import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from 'src/common/tokens/token';
import type { AuthInterface } from '../domain/auth.interface';
import { AppException } from 'utils/errorClass';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from 'src/utils/constants_ENV';

@Injectable()
export class AuthService {

    constructor(@Inject(AUTH_REPOSITORY)
    private authRepository: AuthInterface) { }

    login(email: string, pass: string) {
        try {

            const user = this.authRepository.getUserByEmail(email)
            if (!user) {
                throw new AppException("USER_NOT_FOUND")
            }


            if (user.password !== pass) {
                throw new AppException("PASSWORD_DONT_MATCH")
            }

            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: '24h',
            })

            const { password, ...cleanUser } = user

            return {
                token,
                user: cleanUser
            }


        } catch (error: any) {
            throw new HttpException(error.message, error.status)
        }

    }


}
