import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './application/auth.service';
import { AUTH_REPOSITORY } from 'src/common/tokens/token';
import { InMemoryAuthRepository } from './infrastructure/in-memory/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/utils/constants_ENV';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '24h' }
  })],
  controllers: [AuthController],
  providers: [AuthService, {

    provide: AUTH_REPOSITORY,
    useClass: InMemoryAuthRepository

  }]
})
export class AuthModule { }
