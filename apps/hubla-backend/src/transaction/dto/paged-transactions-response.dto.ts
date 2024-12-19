import { ApiProperty } from '@nestjs/swagger';
import { PagedResponseDto } from '../../common/dto/paged-response.dto';
import { TransactionDto } from './transaction.dto';

export class PagedTransactionsResponseDto extends PagedResponseDto {
  @ApiProperty({ description: 'Lista de transações' })
  rows: TransactionDto[];
}
