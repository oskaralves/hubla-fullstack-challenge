import { IsArray, IsOptional } from 'class-validator';
import { QueryParamsDto } from '../../common/dto/query-params.dto';
import { Transform } from 'class-transformer';

export class PagedTransactionsQueryParamsDto extends QueryParamsDto {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => (!value ? [] : value.split(',')))
  transactionTypes?: string[] | null;
}
