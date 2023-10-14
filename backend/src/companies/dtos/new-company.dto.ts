import { IsNotEmpty } from 'class-validator';

export class NewCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  userId: number;
}
