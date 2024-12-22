import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionTypeModule } from './transaction-type/transaction-type.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TransactionModule,
    TransactionTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
