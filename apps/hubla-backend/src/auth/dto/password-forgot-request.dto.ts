import { IsEmail } from 'class-validator';

export class PasswordForgotRequestDto {
  @IsEmail()
  email: string;
}
