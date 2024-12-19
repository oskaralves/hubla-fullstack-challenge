import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description:
      'Tipo da transação (1: Venda produtor, 2: Venda afiliado, etc.)',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  type: number;

  @ApiProperty({
    description: 'Data da transação (ISO 8601 format)',
    example: '2024-12-19T12:34:56Z',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Produto Exemplo',
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    description: 'Valor da transação em centavos',
    example: 1000,
  })
  @IsInt()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    description: 'Nome do vendedor',
    example: 'João Silva',
  })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  seller: string;
}
