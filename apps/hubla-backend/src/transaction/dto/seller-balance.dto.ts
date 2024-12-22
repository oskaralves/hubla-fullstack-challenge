import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SellerBalanceDto {
  @ApiProperty({
    description: 'Seller name',
  })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  seller: string;

  @ApiProperty({
    description: 'Balance value in cents',
    example: 1000,
  })
  @IsInt()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    description: 'Last transaction date',
    example: 1000,
  })
  lastTransactionDate: Date | null;
}
