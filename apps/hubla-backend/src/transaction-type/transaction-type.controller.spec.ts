import { Test, TestingModule } from '@nestjs/testing';
import { PagedTransactionTypesQueryParamsDto } from './dto/paged-transaction-types-params.dto';
import { PagedTransactionTypesResponseDto } from './dto/paged-transaction-types-response.dto';
import { TransactionTypeController } from './transaction-type.controller';
import { TransactionTypeService } from './transaction-type.service';

describe('TransactionTypeController', () => {
  let controller: TransactionTypeController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: TransactionTypeService;

  const mockTransactionTypeService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionTypeController],
      providers: [
        {
          provide: TransactionTypeService,
          useValue: mockTransactionTypeService,
        },
      ],
    }).compile();

    controller = module.get<TransactionTypeController>(
      TransactionTypeController,
    );
    service = module.get<TransactionTypeService>(TransactionTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call TransactionTypeService.findAll with correct params', async () => {
      const query: PagedTransactionTypesQueryParamsDto = {
        search: '',
        skip: 0,
        take: 10,
        sort: 'description:asc',
        path: '/transactions',
      };

      const result: PagedTransactionTypesResponseDto = {
        countRows: 2,
        totalRows: 2,
        currentPage: 1,
        totalPages: 1,
        hasMore: false,
        links: {
          prev: null,
          next: null,
        },
        meta: {
          timestamp: new Date(),
        },
        rows: [
          {
            id: 1,
            description: 'Venda produtor',
            nature: 'INPUT',
          },
          {
            id: 2,
            description: 'Taxa de serviço',
            nature: 'OUTPUT',
          },
        ],
      };

      mockTransactionTypeService.findAll.mockResolvedValue(result);

      expect(await controller.findAll(query)).toEqual(result);
      expect(mockTransactionTypeService.findAll).toHaveBeenCalledWith(query);
    });
  });
});
