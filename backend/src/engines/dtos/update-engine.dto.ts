import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateEngineDto {
  @IsNotEmpty()
  name?: string;

  @IsInt()
  cylinders?: number;

  @IsDecimal()
  power?: number;

  @IsDecimal()
  capacity?: number;

  @IsInt()
  cost?: number;

  @IsInt()
  weight?: number;

  @IsInt()
  userId?: number;
}
