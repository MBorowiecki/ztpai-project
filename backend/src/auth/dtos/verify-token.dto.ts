import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
