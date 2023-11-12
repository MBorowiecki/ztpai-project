import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthUserDto } from './dtos/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    try {
      return this.authService.registerUser(registerUserDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  login(@Body() authUserDto: AuthUserDto) {
    try {
      return this.authService.loginUser(authUserDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verify')
  verify(@Body() token: string) {
    try {
      return this.authService.verifyToken(token);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
