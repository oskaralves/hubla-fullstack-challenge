import { ApiProperty } from '@nestjs/swagger';
import { PagedResponseDto } from '../../common/dto/paged-response.dto';
import { UserDto } from './user.dto';

export class PagedUsersResponseDto extends PagedResponseDto {
  @ApiProperty({ description: 'Lista de usuários' })
  rows: UserDto[];
}
