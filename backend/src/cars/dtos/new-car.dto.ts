import { IsDecimal, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import {
  CarBodyMaterial,
  CarBodyType,
  CarSegment
} from '../entities/car.entity';
import { ApiProperty } from '@nestjs/swagger';

export class NewCarDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEnum(CarBodyType)
  body_type: CarBodyType;

  @ApiProperty()
  @IsInt()
  number_of_seats: number;

  @ApiProperty()
  @IsEnum(CarBodyMaterial)
  car_body_material: CarBodyMaterial;

  @ApiProperty()
  @IsEnum(CarSegment)
  car_segment: CarSegment;

  @ApiProperty()
  @IsDecimal()
  length: number;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  engineId?: number;
}
