import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PagedResponseDto } from '../../common/dto/paged-response.dto';
import { TransactionTypeDto } from './transaction-type.dto';

export class PagedTransactionTypesResponseDto extends PagedResponseDto<TransactionTypeDto> {
  @ApiProperty({
    description: 'Transaction types list',
    type: [TransactionTypeDto],
  })
  @Type(() => TransactionTypeDto)
  rows: TransactionTypeDto[];
}
