import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PagedTransactionTypesQueryParamsDto } from './dto/paged-transaction-types-params.dto';
import { PagedTransactionTypesResponseDto } from './dto/paged-transaction-types-response.dto';
import { TransactionTypeService } from './transaction-type.service';

@Controller('transaction-types')
@ApiTags('TransactionTypes')
export class TransactionTypeController {
  constructor(private readonly transactionTypeService: TransactionTypeService) { }


  @Get()
  @ApiOperation({ summary: 'Get paged transaction types' })
  @ApiOkResponse({
    description: 'Paged transaction types',
    type: PagedTransactionTypesResponseDto,
  })
  async findAll(
    @Query() queryParams: PagedTransactionTypesQueryParamsDto,
  ): Promise<PagedTransactionTypesResponseDto> {
    return this.transactionTypeService.findAll(queryParams);
  }

}
