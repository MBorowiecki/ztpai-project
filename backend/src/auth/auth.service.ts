import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUserDto } from './dtos/authenticated-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthUserDto } from './dtos/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async loginUser(
    authUserDto: AuthUserDto
  ): Promise<AuthenticatedUserDto | null> {
    const { email, password } = authUserDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const token = this.jwtService.sign({ id: user.id }, { expiresIn: '4d' });

    return {
      email: user.email,
      id: user.id,
      token
    };
  }

  async registerUser(
    authUserDto: RegisterUserDto
  ): Promise<AuthenticatedUserDto | null> {
    const { password, email, username } = authUserDto;

    const foundUsers = await this.userRepository.find({
      where: { email }
    });

    if (foundUsers.length > 0) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      username
    });

    await this.userRepository.save(user);

    const token = this.jwtService.sign({ id: user.id }, { expiresIn: '4d' });

    return {
      email: user.email,
      id: user.id,
      token
    };
  }

  async verifyToken(token: string): Promise<AuthenticatedUserDto | null> {
    const { id } = this.jwtService.verify(token);

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newToken = this.jwtService.sign({ id: user.id }, { expiresIn: '4d' });

    return {
      email: user.email,
      id: user.id,
      token: newToken
    };
  }
}
