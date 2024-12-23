import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'oscar@hub.la',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
  })
  @IsString()
  password: string;
}
