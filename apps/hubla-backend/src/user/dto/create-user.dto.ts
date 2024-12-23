import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderEnum, UserRoleEnum } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Oscar Alves',
    description: 'Nome do usuário.',
  })
  @IsString()
  @Length(3, 90)
  name: string;

  @ApiProperty({
    example: 'Oscar',
    description: 'Nome/apelido no qual o usuário gostaria de ser chamado.',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(2, 40)
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.trim() === '') {
      return null;
    }
    return value;
  })
  nickname?: string | null;

  @ApiPropertyOptional({
    example: 'oscar-alves',
    description:
      'Nome de usuário, usado para identificação personalizada. Exemplo: @oscar-alves.',
    nullable: true,
    required: false,
    default: null,
  })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.trim() === '') {
      return null;
    }
    return value ? value.toLowerCase() : value;
  })
  @Matches(/^[a-z0-9_-]+$/, {
    message:
      'username can only contain letters, numbers, hyphens, and underscores',
  })
  username: string;

  @ApiProperty({
    example: 'oscar@hub.la',
    description: 'E-mail é utilizado para efetuar login.',
    required: true,
  })
  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @ApiPropertyOptional({
    description: 'Número de celular com DDI e DDD',
    examples: ['+5521987654321', '+13019893849'],
    nullable: true,
    required: false,
    default: null,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Remove todos os caracteres não numéricos exceto o '+' no início
      const sanitized = value.replace(/[^\d+]/g, '');
      return sanitized.length > 0 ? sanitized : null;
    }
    return value;
  })
  @Matches(/^\+\d{1,3}\d{1,4}\d{4,10}$/, {
    message:
      'Celular deve estar no formato internacional completo: +<DDI><DDD><Número>',
  })
  cellphone?: string | null;

  @ApiPropertyOptional({
    description: 'Gênero do usuário',
    example: 'MALE',
    default: null,
    required: false,
  })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum | null;

  @ApiPropertyOptional({
    description: 'Data de nascimento',
    required: false,
    default: null,
    example: '1988-09-27',
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  birthDate?: Date | null;

  @ApiProperty({
    example: 'Abcd123!',
    description: `A senha é utilizada para efetuar login.<br /><small>
    → Deve conter ao menos 1 letra maiúscula<br />
    → Deve conter ao menos 1 letra minúscula<br />
    → Deve conter ao menos 1 número<br />
    → Deve conter ao menos 1 caractere especial.</small>`,
  })
  @IsString()
  @Length(6, 90)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Base64 da imagem do avatar do usuário',
    nullable: true,
    required: false,
    default: null,
    example: 'data:image/png;base64,...',
  })
  @IsOptional()
  @IsString()
  image?: string | null;

  @ApiPropertyOptional({
    description: 'Base64 da imagem do capa do usuário',
    nullable: true,
    required: false,
    default: null,
    example: 'data:image/png;base64,...',
  })
  @IsOptional()
  @IsString()
  coverImage?: string | null;

  @ApiPropertyOptional({
    example: ['AFFILIATE'],
    description: `Lista de UserRoleEnum para serem vinculados ao usuário.<br />
      Se não for informado nenhum 'role', o usuário será vinculado ao role AFFILIATE.`,
    nullable: true,
    required: false,
    default: ['AFFILIATE'],
  })
  @IsOptional()
  @IsArray()
  roles?: UserRoleEnum[] | null;
}
