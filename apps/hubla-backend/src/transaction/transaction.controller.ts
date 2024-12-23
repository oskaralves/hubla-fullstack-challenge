import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRoleEnum } from '@prisma/client';
import { Permissions } from '../auth/decorator/permissions.decorator';
import { Roles } from '../auth/decorator/roles.decorator';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { BulkTransactionsResponseDto } from './dto/bulk-transactions-response.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PagedTransactionSellerBalancesResponseDto } from './dto/paged-balance-response.dto';
import { PagedTransactionsQueryParamsDto } from './dto/paged-transactions-params.dto';
import { PagedTransactionsResponseDto } from './dto/paged-transactions-response.dto';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionPermissionEnum } from './enum/transaction-permission.enum';
import { TransactionService } from './transaction.service';

@Controller('transactions')
@UseGuards(AccessTokenGuard, RolesGuard)
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('bulk')
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(TransactionPermissionEnum.CREATE)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'uploadTransactions',
    description: 'Carrega e processa transações em massa.',
  })
  @ApiOkResponse({
    description: 'Bulk transactions processed successfully',
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
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  async uploadTransactions(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BulkTransactionsResponseDto> {
    return this.transactionService.processBulkTransactions(file);
  }

  @Post()
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(TransactionPermissionEnum.CREATE)
  @ApiOperation({ summary: 'create', description: 'Criar uma nova transação.' })
  @ApiCreatedResponse({
    description: 'Transaction created',
    type: TransactionDto,
  })
  @ApiConflictResponse({ description: 'Transaction already exists' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDto> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(TransactionPermissionEnum.READ)
  @ApiOperation({
    summary: 'findAll',
    description: 'Lista paginada de transações.',
  })
  @ApiOkResponse({
    description: 'Paged transactions',
    type: PagedTransactionsResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  async findAll(
    @Query() queryParams: PagedTransactionsQueryParamsDto,
  ): Promise<PagedTransactionsResponseDto> {
    return this.transactionService.findAll(queryParams);
  }

  @Get('seller-balances')
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(TransactionPermissionEnum.READ)
  @ApiOperation({
    summary: 'getSellersWithBalance',
    description:
      'Lista paginada de Afiliados / Produtores e seus saldos atuais.',
  })
  @ApiOkResponse({
    description: 'Transaction found',
    type: PagedTransactionSellerBalancesResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  async getSellersWithBalance(
    @Query() queryParams: PagedTransactionsQueryParamsDto,
  ): Promise<PagedTransactionSellerBalancesResponseDto> {
    return this.transactionService.findAllSellerBalance(queryParams);
  }

  @Get(':id')
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(TransactionPermissionEnum.READ)
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiOkResponse({ description: 'Transaction found', type: TransactionDto })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  async findOne(@Param('id') transactionId: string): Promise<TransactionDto> {
    return this.transactionService.findOne(transactionId);
  }
}
