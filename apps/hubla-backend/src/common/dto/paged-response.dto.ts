import { ApiProperty } from '@nestjs/swagger';

export class LinkDto {
  @ApiProperty({
    example: '/[router]?skip=0&take=10',
  })
  prev?: string | null;

  @ApiProperty({
    example: '/[router]?skip=10&take=10',
  })
  next?: string | null;
}

export class MetaDto {
  @ApiProperty({
    example: '2023-06-13T05:15:35.461Z',
  })
  timestamp?: Date;
}

export class PagedResponseDto<T = any> {
  rows: T[];

  @ApiProperty({
    description: 'Quantidades de registros retornados',
  })
  countRows: number;

  @ApiProperty({
    description: 'Quantidades de registros existentes na base de dados',
  })
  totalRows: number;

  @ApiProperty({
    description: 'Informa qual a página atual',
  })
  currentPage?: number;

  @ApiProperty({
    description: 'Informa a quantidade de páginas existentes',
  })
  totalPages?: number;

  @ApiProperty({
    description: 'Informa true se há registros na próxima pagina',
    default: false,
  })
  hasMore?: boolean;

  @ApiProperty({
    description: 'Informa rotas da próxima página e a anterior',
  })
  links?: LinkDto;

  @ApiProperty()
  meta?: MetaDto;
}
