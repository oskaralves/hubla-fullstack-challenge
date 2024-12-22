import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { PagedTransactionTypesQueryParamsDto } from './dto/paged-transaction-types-params.dto';
import { TransactionTypeDto } from './dto/transaction-type.dto';
import { TransactionTypeService } from './transaction-type.service';

describe('TransactionTypeService', () => {
  let service: TransactionTypeService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    transactionType: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionTypeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TransactionTypeService>(TransactionTypeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call prismaService.$transaction with correct arguments', async () => {
      const mockQueryParams: PagedTransactionTypesQueryParamsDto = {
        search: 'test',
        skip: 0,
        take: 10,
        sort: 'description:asc',
        path: '/transactions',
      };

      const mockRows = [
        { id: 1, nature: 'INCOME', description: 'Test Income' },
        { id: 2, nature: 'EXPENSE', description: 'Test Expense' },
      ];
      const mockCount = 2;

      mockPrismaService.$transaction.mockResolvedValue([mockRows, mockCount]);

      const result = await service.findAll(mockQueryParams);

      expect(prismaService.$transaction).toHaveBeenCalledWith([
        prismaService.transactionType.findMany({
          where: expect.any(Object),
          skip: 0,
          take: 10,
          orderBy: expect.any(Array),
        }),
        prismaService.transactionType.count({ where: expect.any(Object) }),
      ]);

      expect(result).toEqual({
        countRows: mockCount,
        totalRows: mockCount,
        currentPage: 1,
        totalPages: 1,
        hasMore: false,
        links: {
          prev: null,
          next: null,
        },
        meta: {
          timestamp: expect.any(Date), // Permite comparação dinâmica para a data
        },
        rows: mockRows.map((row) => plainToClass(TransactionTypeDto, row)),
      });
    });

    it('should handle empty results', async () => {
      const mockQueryParams: PagedTransactionTypesQueryParamsDto = {
        search: '',
        skip: 0,
        take: 10,
        sort: 'description:asc',
        path: '/transactions',
      };

      mockPrismaService.$transaction.mockResolvedValue([[], 0]);

      const result = await service.findAll(mockQueryParams);

      expect(result).toEqual({
        countRows: 0,
        totalRows: 0,
        currentPage: 0,
        totalPages: 0,
        hasMore: false,
        links: {
          prev: null,
          next: null,
        },
        meta: {
          timestamp: expect.any(Date),
        },
        rows: [],
      });
    });
  });
});
