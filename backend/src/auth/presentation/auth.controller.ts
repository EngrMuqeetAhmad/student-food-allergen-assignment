import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { LoginDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {


    constructor(private authService: AuthService) { }


    @Post('/login')
    login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO.email, loginDTO.password)
    }

}
