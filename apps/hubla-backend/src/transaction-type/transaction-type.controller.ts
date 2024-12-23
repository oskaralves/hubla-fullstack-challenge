import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiForbiddenResponse,
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
import { PagedTransactionTypesQueryParamsDto } from './dto/paged-transaction-types-params.dto';
import { PagedTransactionTypesResponseDto } from './dto/paged-transaction-types-response.dto';
import { TransactionTypePermissionEnum } from './enum/transaction-type-permission.enum';
import { TransactionTypeService } from './transaction-type.service';

@Controller('transaction-types')
@UseGuards(AccessTokenGuard, RolesGuard)
@ApiTags('TransactionTypes')
export class TransactionTypeController {
  constructor(
    private readonly transactionTypeService: TransactionTypeService,
  ) {}

  @Get()
  @Roles(UserRoleEnum.ADMIN)
  @Permissions(TransactionTypePermissionEnum.READ)
  @ApiOperation({
    summary: 'findAll',
    description: 'Lista paginada de tipos de transações.',
  })
  @ApiOkResponse({
    description: 'Paged transaction types',
    type: PagedTransactionTypesResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  async findAll(
    @Query() queryParams: PagedTransactionTypesQueryParamsDto,
  ): Promise<PagedTransactionTypesResponseDto> {
    return this.transactionTypeService.findAll(queryParams);
  }
}
