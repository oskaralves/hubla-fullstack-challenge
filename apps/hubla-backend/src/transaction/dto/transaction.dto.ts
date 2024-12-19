import { ApiProperty } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';

export class TransactionDto extends CreateTransactionDto {
  @ApiProperty({
    description: 'ID único da transação',
    example: '1a2b3c4d-5678-90ef-1234-567890abcdef',
  })
  id: string;
}
