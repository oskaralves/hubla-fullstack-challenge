import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryParamsDto {
  @ApiHideProperty()
  path: string;

  @ApiPropertyOptional({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => decodeURIComponent(value))
  search: string;

  @ApiPropertyOptional({
    required: false,
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  skip: number;

  @ApiPropertyOptional({
    required: false,
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  take: number;

  @ApiPropertyOptional({
    required: false,
    example: 'property1:asc,property2:desc',
  })
  @IsOptional()
  @IsString()
  sort: string;
}
