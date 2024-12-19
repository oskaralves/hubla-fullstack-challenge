import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { ResponseHelper } from '../common/helpers/response.helper';
import { SearchHelper } from '../common/helpers/search.helper';
import { SortHelper } from '../common/helpers/sort.helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PagedTransactionsQueryParamsDto } from './dto/paged-transactions-params.dto';
import { PagedTransactionsResponseDto } from './dto/paged-transactions-response.dto';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionValidationHelper } from './helpers/transaction-validation.helper';

@Injectable()
export class TransactionService {
  private readonly fieldsToSearch: Prisma.TransactionScalarFieldEnum[] = [
    'seller',
    'product',
    'date',
  ];

  constructor(
    private readonly prismaService: PrismaService,
    private readonly transactionValidationHelper: TransactionValidationHelper,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDto> {
    const transaction = await this.prismaService.transaction.create({
      data: createTransactionDto,
    });

    return plainToClass(TransactionDto, transaction);
  }

  async findAll({
    search = '',
    skip = 0,
    take = 10,
    sort = 'date:desc',
    path = '/transactions',
  }: PagedTransactionsQueryParamsDto): Promise<PagedTransactionsResponseDto> {
    const where = SearchHelper.searchBuilder({
      search,
      fields: this.fieldsToSearch,
    });

    const orderBy =
      SortHelper.parseSortParam<Prisma.TransactionOrderByWithAggregationInput>(
        sort,
        [...this.fieldsToSearch, 'date'],
      );

    const [rows, totalRows] = await this.prismaService.$transaction([
      this.prismaService.transaction.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prismaService.transaction.count({ where }),
    ]);

    return ResponseHelper.pagedResponse<TransactionDto>({
      path,
      search,
      skip,
      take,
      sort,
      rows: rows.map((item) => plainToClass(TransactionDto, item)),
      totalRows,
    });
  }

  async findOne(id: string) {
    await this.transactionValidationHelper.validateTransactionExistsById(id);

    const transaction = this.prismaService.transaction.findUnique({
      where: { id },
    });

    return plainToClass(TransactionDto, transaction);
  }
}
