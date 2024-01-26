import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateEngineDto {
  @ApiProperty()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsInt()
  cylinders?: number;

  @ApiProperty()
  @IsDecimal()
  power?: number;

  @ApiProperty()
  @IsDecimal()
  capacity?: number;

  @ApiProperty()
  @IsInt()
  cost?: number;

  @ApiProperty()
  @IsInt()
  weight?: number;

  @ApiProperty()
  @IsInt()
  userId?: number;
}
