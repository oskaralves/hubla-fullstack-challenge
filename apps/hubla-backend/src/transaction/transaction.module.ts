import { Module } from '@nestjs/common';
import { TransactionValidationHelper } from './helper/transaction-validation.helper';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionValidationHelper],
})
export class TransactionModule {}
