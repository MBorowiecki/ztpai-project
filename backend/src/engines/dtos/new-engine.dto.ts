import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class NewEngineDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  cylinders: number;

  @IsDecimal()
  power: number;

  @IsDecimal()
  capacity: number;

  @IsInt()
  weight: number;

  @IsInt()
  userId: number;
}
