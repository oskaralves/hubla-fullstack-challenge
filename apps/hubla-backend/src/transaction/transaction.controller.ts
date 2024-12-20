import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BulkTransactionsResponseDto } from './dto/bulk-transactions-response.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PagedTransactionsQueryParamsDto } from './dto/paged-transactions-params.dto';
import { PagedTransactionsResponseDto } from './dto/paged-transactions-response.dto';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('bulk')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload and process bulk transactions' })
  @ApiOkResponse({
    description: '',
    type: BulkTransactionsResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadTransactions(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BulkTransactionsResponseDto> {
    return this.transactionService.processBulkTransactions(file);
  }

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
    description: 'Paged transactions',
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
