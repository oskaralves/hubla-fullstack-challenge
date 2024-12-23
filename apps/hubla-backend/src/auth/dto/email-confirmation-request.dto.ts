import { IsEmail, IsNumber } from 'class-validator';

export class EmailConfirmationDto {
  @IsEmail()
  email: string;

  @IsNumber()
  code: number;
}
