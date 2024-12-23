import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { PagedResponseDto } from '../../common/dto/paged-response.dto';

export class PagedPermissionsResponseDto extends PagedResponseDto {
  @ApiProperty({ description: 'Lista de permissões' })
  rows: PermissionDto[];
}

export class PermissionDto {
  @ApiProperty({
    description: 'Identificação única da permissão',
    example: '99a9d716-53e5-4dfb-b7c8-df1351a150e7',
  })
  id: string;

  @ApiProperty({
    description: 'Criar usuários',
    example: 'users.create',
  })
  name: string;

  @ApiHideProperty()
  @Exclude()
  rolePermissions: PermissionRoleDto[];
}

export class PermissionRoleDto {
  @ApiProperty({ description: 'role do usuário' })
  role: UserRoleEnum;
}
