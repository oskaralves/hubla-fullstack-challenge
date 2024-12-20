import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PagedResponseDto } from '../../common/dto/paged-response.dto';
import { TransactionDto } from './transaction.dto';

export class PagedTransactionsResponseDto extends PagedResponseDto<TransactionDto> {
  @ApiProperty({
    description: 'Transactions list',
    type: [TransactionDto],
  })
  @Type(() => TransactionDto)
  rows: TransactionDto[];
}
