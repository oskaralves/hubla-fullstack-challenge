import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { ResponseHelper } from '../common/helpers/response.helper';
import { SearchHelper } from '../common/helpers/search.helper';
import { SortHelper } from '../common/helpers/sort.helper';
import { PrismaService } from '../prisma/prisma.service';
import { PagedTransactionTypesQueryParamsDto } from './dto/paged-transaction-types-params.dto';
import { PagedTransactionTypesResponseDto } from './dto/paged-transaction-types-response.dto';
import { TransactionTypeDto } from './dto/transaction-type.dto';

@Injectable()
export class TransactionTypeService {
  private readonly fieldsToSearch: Prisma.TransactionTypeScalarFieldEnum[] = [
    'nature',
    'description',
  ];

  constructor(
    private readonly prismaService: PrismaService,
  ) { }


  async findAll({
    search = '',
    skip = 0,
    take = 10,
    sort = 'description:asc',
    path = '/transactions',
  }: PagedTransactionTypesQueryParamsDto): Promise<PagedTransactionTypesResponseDto> {
    const where = SearchHelper.searchBuilder({
      search,
      fields: this.fieldsToSearch,
    });

    const orderBy =
      SortHelper.parseSortParam<Prisma.TransactionTypeOrderByWithAggregationInput>(
        sort,
        [...this.fieldsToSearch, 'description'],
      );

    const [rows, totalRows] = await this.prismaService.$transaction([
      this.prismaService.transactionType.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prismaService.transactionType.count({ where }),
    ]);

    return ResponseHelper.pagedResponse<TransactionTypeDto>({
      path,
      search,
      skip,
      take,
      sort,
      rows: rows.map((item) => plainToClass(TransactionTypeDto, item)),
      totalRows,
    }) as PagedTransactionTypesResponseDto;
  }

}
