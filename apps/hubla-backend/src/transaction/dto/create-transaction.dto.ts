import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description:
      'Type of Transaction (1: Venda produtor, 2: Venda afiliado, etc.)',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
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
}
