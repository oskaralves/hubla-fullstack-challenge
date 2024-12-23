// transaction.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionNatureEnum } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionValidationHelper } from './helper/transaction-validation.helper';
import { TransactionService } from './transaction.service';

const mockPrismaService = {
  transaction: {
    findMany: jest.fn(),
    create: jest.fn(),
    count: jest.fn(),
    createMany: jest.fn(),
    findUnique: jest.fn(),
  },
  $transaction: jest.fn(),
};

const mockValidationHelper = {
  validateTransactionExistsById: jest.fn(),
  validateTransaction: jest.fn(),
};

describe('TransactionService', () => {
  let service: TransactionService;
  let prismaService: typeof mockPrismaService;
  let validationHelper: typeof mockValidationHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: TransactionValidationHelper,
          useValue: mockValidationHelper,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    prismaService = module.get(PrismaService);
    validationHelper = module.get(TransactionValidationHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processBulkTransactions', () => {
    it('should process and return success and error messages', async () => {
      const fileMock = {
        buffer: Buffer.from(
          '1 2022-01-01T10:00:00Z Product 100 Seller\n2 2022-01-01T11:00:00Z Product 200 Seller2',
        ),
      } as Express.Multer.File;

      validationHelper.validateTransaction.mockResolvedValue(undefined);
      prismaService.transaction.createMany.mockResolvedValue({ count: 2 });

      const result = await service.processBulkTransactions(fileMock);

      expect(result.successMessages.length).toBe(2);
      expect(result.errorMessages.length).toBe(0);
      expect(prismaService.transaction.createMany).toHaveBeenCalled();
    });

    it('should return error messages for invalid transactions', async () => {
      const fileMock = {
        buffer: Buffer.from(
          '1 InvalidData\n2 2022-01-01T11:00:00Z Product 200 Seller2',
        ),
      } as Express.Multer.File;

      validationHelper.validateTransaction.mockImplementation((_, line) => {
        if (line === 1) throw new Error('Invalid transaction format');
      });

      const result = await service.processBulkTransactions(fileMock);

      expect(result.successMessages.length).toBe(1);
      expect(result.errorMessages.length).toBe(1);
    });
  });

  describe('findAllSellerBalance', () => {
    it('should return paginated seller balances', async () => {
      prismaService.transaction.findMany.mockResolvedValue([
        {
          seller: 'Seller1',
          transactionType: { nature: TransactionNatureEnum.INPUT },
          value: 200,
          date: new Date('2022-01-01'),
        },
        {
          seller: 'Seller2',
          transactionType: { nature: TransactionNatureEnum.INPUT },
          value: 100,
          date: new Date('2022-01-03'),
        },
      ]);

      const result = await service.findAllSellerBalance({
        search: '',
        path: '',
        sort: 'date:asc',
        skip: 0,
        take: 10,
      });

      expect(result.rows.length).toBe(2);
      expect(result.rows[0].balance).toBe(100);
      expect(result.rows[1].balance).toBe(200);

      expect(prismaService.transaction.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single transaction', async () => {
      prismaService.transaction.findUnique.mockResolvedValue({
        id: '1',
        seller: 'Seller1',
        product: 'Product',
        value: 100,
        transactionType: { nature: TransactionNatureEnum.INPUT },
      });

      const result = await service.findOne('1');

      expect(result).toBeDefined();
      expect(result.seller).toBe('Seller1');
      expect(prismaService.transaction.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { transactionType: true },
      });
    });

    it('should throw an error if transaction is not found', async () => {
      validationHelper.validateTransactionExistsById.mockImplementation(() => {
        throw new Error('Transaction not found');
      });

      await expect(service.findOne('invalid-id')).rejects.toThrow(
        'Transaction not found',
      );
    });
  });
});
