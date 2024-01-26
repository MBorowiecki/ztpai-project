import {
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty
} from 'class-validator';
import {
  CarBodyMaterial,
  CarBodyType,
  CarSegment
} from '../entities/car.entity';

export class UpdateCarDto {
  @IsNotEmpty()
  name?: string;

  @IsEnum(CarBodyType)
  body_type?: CarBodyType;

  @IsInt()
  number_of_seats?: number;

  @IsEnum(CarBodyMaterial)
  car_body_material?: CarBodyMaterial;

  @IsEnum(CarSegment)
  car_segment?: CarSegment;

  @IsDecimal()
  length: number;

  @IsBoolean()
  in_production?: boolean;

  userId?: number;
  engineId?: number;
}
