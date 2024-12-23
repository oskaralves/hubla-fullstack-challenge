import { UserRoleEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { QueryParamsDto } from '../../common/dto/query-params.dto';

export class UsersQueryParamsDto extends QueryParamsDto {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => (!value ? [] : value.split(',')))
  roles?: UserRoleEnum[] | null;
}
