import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TransactionTypeDto } from '../../transaction-type/dto/transaction-type.dto';

export class TransactionDto {
  @ApiProperty({
    description: 'Unique transaction ID',
    example: '1a2b3c4d-5678-90ef-1234-567890abcdef',
  })
  id: string;

  @ApiProperty({
    description:
      'Type of Transaction (1: Venda produtor, 2: Venda afiliado, etc.)',
    example: 1,
  })
  @IsInt()
  type: number;

  @ApiProperty({
    description: 'Transaction Date (ISO 8601 format)',
    example: '2024-12-19T12:34:56Z',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Description of product',
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    description: 'Transaction value in cents',
    example: 1000,
  })
  @IsInt()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    description: 'Seller name',
  })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  seller: string;

  @ApiProperty({ description: 'Transaction type list' })
  @Type(() => TransactionTypeDto)
  transactionType: TransactionTypeDto;
}
