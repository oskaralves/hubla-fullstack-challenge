import { ApiProperty } from '@nestjs/swagger';

export class BulkTransactionsResponseDto {
  @ApiProperty({
    description: 'Indicates whether there was an error in processing',
    example: true,
  })
  error: boolean;

  @ApiProperty({
    description:
      'List of error messages associated with processed transactions',
    example: [
      'Line 18: Transaction already registered in the database.',
      'Line 21: Transaction already registered in the database.',
      'Line 27: Transaction already registered in the database.',
    ],
  })
  messages: string[];
}
