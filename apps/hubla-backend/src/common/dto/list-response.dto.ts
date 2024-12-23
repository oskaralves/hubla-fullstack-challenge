import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty({
    example: '2023-06-13T05:15:35.461Z',
  })
  timestamp?: Date;
}

export class ListResponseDto<T = any> {
  rows: T[];

  @ApiProperty({
    description: 'Quantidades de registros existentes na base de dados',
  })
  totalRows: number;

  @ApiProperty()
  meta?: MetaDto;
}
