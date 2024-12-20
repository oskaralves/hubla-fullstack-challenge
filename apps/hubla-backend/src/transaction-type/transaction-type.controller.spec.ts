import { Test, TestingModule } from '@nestjs/testing';
import { TransactionTypeController } from './transaction-type.controller';
import { TransactionTypeService } from './transaction-type.service';

describe('TransactionController', () => {
  let controller: TransactionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionTypeController],
      providers: [TransactionTypeService],
    }).compile();

    controller = module.get<TransactionTypeController>(TransactionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
