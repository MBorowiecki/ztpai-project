import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';

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
  login(@Body() registerUserDto: RegisterUserDto) {
    try {
      return this.authService.loginUser(registerUserDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
