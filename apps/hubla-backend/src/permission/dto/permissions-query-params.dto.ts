import { UserRoleEnum } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { QueryParamsDto } from '../../common/dto/query-params.dto';

export class PermissionsQueryParamsDto extends QueryParamsDto {
  @IsEnum(UserRoleEnum)
  @IsOptional()
  role?: UserRoleEnum;
}
