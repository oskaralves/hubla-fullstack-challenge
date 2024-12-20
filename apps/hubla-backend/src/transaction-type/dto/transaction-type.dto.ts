import { ApiProperty } from '@nestjs/swagger';
import { TransactionNatureEnum } from '@prisma/client';

export class TransactionTypeDto {
  @ApiProperty({
    description: 'Transaction type Id',
  })
  id: string;

  @ApiProperty({
    description: 'Transaction type description',
  })
  description: string;

  @ApiProperty({
    description: 'INCOME or EXPENSE',
    example: 'INCOME',
    enum: TransactionNatureEnum
  })
  nature: TransactionNatureEnum;
}
