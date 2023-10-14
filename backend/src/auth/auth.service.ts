import { Injectable } from '@nestjs/common';
import { AuthUserDto } from './dtos/auth-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  registerUser(authUserDto: AuthUserDto) {
    const { password, email } = authUserDto;

    const hashedPassword = bcrypt.hashSync(password, 10);
  }
}
