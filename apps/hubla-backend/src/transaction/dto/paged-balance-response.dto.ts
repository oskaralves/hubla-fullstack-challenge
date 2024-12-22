import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PagedResponseDto } from '../../common/dto/paged-response.dto';
import { SellerBalanceDto } from './seller-balance.dto';

export class PagedTransactionSellerBalancesResponseDto extends PagedResponseDto<SellerBalanceDto> {
  @ApiProperty({
    description: 'Seller balance list',
    type: [SellerBalanceDto],
  })
  @Type(() => SellerBalanceDto)
  rows: SellerBalanceDto[];
}
