import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { ResponseHelper } from '../common/helpers/response.helper';
import { SearchHelper } from '../common/helpers/search.helper';
import { SortHelper } from '../common/helpers/sort.helper';
import { PrismaService } from '../prisma/prisma.service';
import { BulkTransactionsResponseDto } from './dto/bulk-transactions-response.dto';
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
  ];

  constructor(
    private readonly prismaService: PrismaService,
    private readonly transactionValidationHelper: TransactionValidationHelper,
  ) {}

  async processBulkTransactions(
    file: Express.Multer.File,
  ): Promise<BulkTransactionsResponseDto> {
    const lines = file.buffer
      .toString('utf-8')
      .split('\n')
      .map((line) => line.trim());
    const errorMessages: string[] = [];
    const successMessages: string[] = [];
    const validTransactions: CreateTransactionDto[] = [];

    for (const [index, line] of lines.entries()) {
      const lineNumber = index + 1;

      if (!line) continue; // Ignora linhas vazias

      try {
        const transaction = this.parseTransactionLine(line);
        await this.transactionValidationHelper.validateTransaction(
          transaction,
          lineNumber,
        );
        validTransactions.push(transaction);
        successMessages.push(
          `Linha ${lineNumber}: Transação de "${transaction.seller}" importada com sucesso!`,
        );
      } catch (error) {
        errorMessages.push(error.message);
      }
    }

    if (validTransactions.length > 0) {
      await this.prismaService.transaction.createMany({
        data: validTransactions,
        skipDuplicates: true,
      });
    }

    return {
      error: errorMessages.length > 0,
      errorMessages,
      successMessages,
    };
  }

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDto> {
    const line = 1;
    await this.transactionValidationHelper.validateTransaction(
      createTransactionDto,
      line,
    );

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
    transactionTypes = [],
  }: PagedTransactionsQueryParamsDto): Promise<PagedTransactionsResponseDto> {
    const where = {
      ...SearchHelper.searchBuilder({
        search,
        fields: this.fieldsToSearch,
      }),
      ...(transactionTypes.length > 0 && {
        type: {
          in: transactionTypes.map((type) => Number(type)),
        },
      }),
    };

    const orderBy =
      SortHelper.parseSortParam<Prisma.TransactionOrderByWithAggregationInput>(
        sort,
        [...this.fieldsToSearch, 'date'],
      );

    const [rows, totalRows] = await this.prismaService.$transaction([
      this.prismaService.transaction.findMany({
        include: { transactionType: true },
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
    }) as PagedTransactionsResponseDto;
  }

  async findOne(id: string) {
    await this.transactionValidationHelper.validateTransactionExistsById(id);

    const transaction = this.prismaService.transaction.findUnique({
      where: { id },
      include: { transactionType: true },
    });

    return plainToClass(TransactionDto, transaction);
  }

  private parseTransactionLine(line: string) {
    const data = {
      type: parseInt(line.slice(0, 1), 10),
      date: new Date(line.slice(1, 26)),
      product: line.slice(26, 56).trim(),
      value: parseInt(line.slice(56, 66), 10),
      seller: line.slice(66).trim(),
    };

    return plainToClass(CreateTransactionDto, data);
  }
}
