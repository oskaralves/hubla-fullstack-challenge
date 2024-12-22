import { Test, TestingModule } from '@nestjs/testing';
import { BulkTransactionsResponseDto } from './dto/bulk-transactions-response.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PagedTransactionSellerBalancesResponseDto } from './dto/paged-balance-response.dto';
import { PagedTransactionsQueryParamsDto } from './dto/paged-transactions-params.dto';
import { PagedTransactionsResponseDto } from './dto/paged-transactions-response.dto';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  const mockTransactionService = {
    create: jest.fn(),
    processBulkTransactions: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findAllSellerBalance: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call TransactionService.create with correct data', async () => {
      const dto: CreateTransactionDto = {
        type: 1,
        date: new Date().toUTCString(),
        product: 'Test Product',
        value: 100,
        seller: 'Test Seller',
      };
      const result = { id: '1', ...dto };
      mockTransactionService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockTransactionService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('processBulkTransactions', () => {
    it('should call TransactionService.processBulkTransactions with correct file', async () => {
      const mockFile = {
        buffer: Buffer.from('mock data'),
      } as Express.Multer.File;
      const result: BulkTransactionsResponseDto = {
        error: false,
        errorMessages: [],
        successMessages: ['Transaction imported successfully'],
      };
      mockTransactionService.processBulkTransactions.mockResolvedValue(result);

      expect(await service.processBulkTransactions(mockFile)).toEqual(result);
      expect(
        mockTransactionService.processBulkTransactions,
      ).toHaveBeenCalledWith(mockFile);
    });
  });

  describe('findAll', () => {
    it('should call TransactionService.findAll with correct params', async () => {
      const query: PagedTransactionsQueryParamsDto = {
        search: '',
        skip: 0,
        take: 10,
        sort: 'date:desc',
        path: '/transactions',
        transactionTypes: [],
      };
      const result: PagedTransactionsResponseDto = {
        countRows: 1,
        totalRows: 1,
        currentPage: 1,
        totalPages: 2,
        hasMore: true,
        links: {
          prev: null,
          next: '/transactions?skip=0&take=10&sort=date:desc',
        },
        meta: {
          timestamp: new Date('2024-12-22T17:35:36.364Z'),
        },
        rows: [
          {
            id: '2472419e-a4cc-4145-b430-3f0773539d89',
            type: 1,
            date: '2022-03-03T12:07:35.000Z',
            product: 'DESENVOLVEDOR FULL STACK',
            value: 155000,
            seller: 'ELIANA NOGUEIRA',
            transactionType: {
              id: 1,
              description: 'Venda produtor',
              nature: 'INPUT',
            },
          },
        ],
      };
      mockTransactionService.findAll.mockResolvedValue(result);

      expect(await controller.findAll(query)).toEqual(result);
      expect(mockTransactionService.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findAllSellerBalance', () => {
    it('should call TransactionService.findAllSellerBalance with correct params', async () => {
      const query: PagedTransactionsQueryParamsDto = {
        search: '',
        skip: 0,
        take: 10,
        sort: 'seller:asc',
        path: '/transactions/seller-balances',
      };
      const result: PagedTransactionSellerBalancesResponseDto = {
        countRows: 1,
        totalRows: 1,
        currentPage: 1,
        totalPages: 2,
        hasMore: true,
        links: {
          prev: null,
          next: '/transactions/seller-balances?skip=0&take=10&sort=date:desc',
        },
        meta: {
          timestamp: new Date('2024-12-22T17:35:36.364Z'),
        },
        rows: [
          {
            balance: 155000,
            seller: 'ELIANA NOGUEIRA',
            lastTransactionDate: new Date('2022-12-22T17:35:36.364Z'),
          },
        ],
      };
      mockTransactionService.findAllSellerBalance.mockResolvedValue(result);

      expect(await service.findAllSellerBalance(query)).toEqual(result);
      expect(mockTransactionService.findAllSellerBalance).toHaveBeenCalledWith(
        query,
      );
    });
  });
});
