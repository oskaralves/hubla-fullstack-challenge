import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { GenderEnum, UserRoleEnum } from '@prisma/client';
import { Exclude, Transform, Type } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    description: 'Identificação única do usuário',
    example: '99a9d716-53e5-4dfb-b7c8-df1351a150e7',
  })
  id: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'Oscar Alves',
  })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'oscar@hub.la',
  })
  email: string;

  @ApiProperty({
    description:
      'Se preenchido, indica que o email foi confirmado. (default = null)',
    example: null,
  })
  emailVerified: Date;

  @ApiProperty({
    description: 'Número de celular com DDI e DDD',
    examples: ['+5521987654321', '+13019893849'],
  })
  cellphone: string;

  @ApiProperty({
    description:
      'Se preenchido, indica que o número de celular foi confirmado. (default = null)',
    example: null,
  })
  cellphoneVerified: Date;

  @Exclude()
  @ApiHideProperty()
  password: string;

  @ApiProperty({
    description: 'Nome ou apelido que o usuário gostaria de ser chamado',
  })
  nickname?: string | null;

  @ApiProperty({
    description:
      'Nome de usuário, usado para identificação personalizada. Exemplo: @oscar-alves.',
  })
  @Transform(({ value }) => `@${value}`)
  username: string;

  @ApiProperty({
    description: 'Gênero do usuário',
    example: 'MALE',
    default: null,
    required: false,
  })
  gender: GenderEnum;

  @ApiProperty({
    description: 'Data de nascimento',
    required: false,
    example: '1988-09-27',
  })
  birthDate: Date;

  @ApiProperty({
    description: 'Data de criação',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Base64 da imagem do avatar do usuário',
    nullable: true,
    required: false,
    default: null,
  })
  image?: string | null;

  @ApiProperty({ description: 'Roles do usuário' })
  @Type(() => UserRoleDto)
  roles: UserRoleDto[];
}

export class UserRoleDto {
  @Exclude()
  @ApiHideProperty()
  id: string;

  @Exclude()
  @ApiHideProperty()
  userId: string;

  @Exclude()
  @ApiHideProperty()
  roleId: string;

  @ApiProperty({
    description: 'role do usuário',
    example: 'CUSTOMER',
    default: ['CUSTOMER'],
  })
  role: UserRoleEnum;
}
