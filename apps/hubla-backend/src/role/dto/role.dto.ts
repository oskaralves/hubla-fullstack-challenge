import { ApiProperty } from '@nestjs/swagger';
import { ListResponseDto } from '../../common/dto/list-response.dto';

export class RolesResponseDto extends ListResponseDto<RoleDto> {
  @ApiProperty({ description: 'Lista de funções do usuário' })
  rows: RoleDto[];
}

export class RoleDto {
  role: string;
}
