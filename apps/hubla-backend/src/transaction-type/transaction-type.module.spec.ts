import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionTypeController } from './transaction-type.controller';
import { TransactionTypeService } from './transaction-type.service';

describe('TransactionTypeModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TransactionTypeService],
      controllers: [TransactionTypeController],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide TransactionTypeService', () => {
    const service = module.get<TransactionTypeService>(TransactionTypeService);
    expect(service).toBeDefined();
  });

  it('should register TransactionTypeController', () => {
    const controller = module.get<TransactionTypeController>(
      TransactionTypeController,
    );
    expect(controller).toBeDefined();
  });
});
