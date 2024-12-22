import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionValidationHelper } from './helpers/transaction-validation.helper';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TransactionService, TransactionValidationHelper],
      controllers: [TransactionController],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide TransactionService', () => {
    const service = module.get<TransactionService>(TransactionService);
    expect(service).toBeDefined();
  });

  it('should provide TransactionValidationHelper', () => {
    const helper = module.get<TransactionValidationHelper>(
      TransactionValidationHelper,
    );
    expect(helper).toBeDefined();
  });

  it('should register TransactionController', () => {
    const controller = module.get<TransactionController>(TransactionController);
    expect(controller).toBeDefined();
  });
});
