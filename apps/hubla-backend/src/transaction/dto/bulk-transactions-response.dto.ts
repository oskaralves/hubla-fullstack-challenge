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
  errorMessages: string[];

  @ApiProperty({
    description:
      'List of success messages for transactions that were processed successfully.',
    example: [
      'Line 1: Transaction with ID "67890" processed successfully.',
      'Line 5: Transaction with ID "11223" added to the database.',
      'Line 10: Transaction with ID "44556" processed and validated successfully.',
    ],
  })
  successMessages: string[];
}
