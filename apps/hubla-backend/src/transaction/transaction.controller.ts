import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PagedTransactionsQueryParamsDto } from './dto/paged-transactions-params.dto';
import { PagedTransactionsResponseDto } from './dto/paged-transactions-response.dto';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiCreatedResponse({
    description: 'Transaction created',
    type: TransactionDto,
  })
  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiCreatedResponse({
    description: 'Transaction created',
    type: TransactionDto,
  })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDto> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paged transactions' })
  @ApiOkResponse({
    description: 'Paginated transactions',
    type: PagedTransactionsResponseDto,
  })
  async findAll(
    @Query() queryParams: PagedTransactionsQueryParamsDto,
  ): Promise<PagedTransactionsResponseDto> {
    return this.transactionService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiOkResponse({ description: 'Transaction found', type: TransactionDto })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  async findOne(@Param('id') transactionId: string): Promise<TransactionDto> {
    return this.transactionService.findOne(transactionId);
  }
}
