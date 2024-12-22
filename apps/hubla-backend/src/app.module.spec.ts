import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionTypeModule } from './transaction-type/transaction-type.module';
import { TransactionModule } from './transaction/transaction.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should compile the AppModule successfully', () => {
    expect(module).toBeDefined();
  });

  it('should import ConfigModule as global', () => {
    const configModule = module.get(ConfigModule);
    expect(configModule).toBeDefined();
  });

  it('should include PrismaModule', () => {
    const prismaModule = module.get(PrismaModule);
    expect(prismaModule).toBeDefined();
  });

  it('should include TransactionModule', () => {
    const transactionModule = module.get(TransactionModule);
    expect(transactionModule).toBeDefined();
  });

  it('should include TransactionTypeModule', () => {
    const transactionTypeModule = module.get(TransactionTypeModule);
    expect(transactionTypeModule).toBeDefined();
  });
});
