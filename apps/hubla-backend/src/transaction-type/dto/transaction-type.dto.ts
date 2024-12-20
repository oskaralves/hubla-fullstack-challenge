import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { TransactionNatureEnum } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class TransactionTypeDto {
  @Exclude()
  @ApiHideProperty()
  id: string;

  @ApiProperty({
    description: 'Transaction type description',
  })
  description: string;

  @ApiProperty({
    description: 'Tipo do endereço',
    example: 'HOME',
  })
  nature: TransactionNatureEnum;
}
