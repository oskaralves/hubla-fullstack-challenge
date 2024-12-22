import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionValidationHelper } from './transaction-validation.helper';

describe('TransactionValidationHelper', () => {
  let helper: TransactionValidationHelper;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: PrismaService;

  const mockTransaction = {
    type: 1,
    date: new Date().toISOString(),
    product: 'Product A',
    value: 100,
    seller: 'Seller A',
  };

  const mockPrismaService = {
    transaction: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
    transactionType: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionValidationHelper,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    helper = module.get<TransactionValidationHelper>(
      TransactionValidationHelper,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(helper).toBeDefined();
  });

  describe('validateTransactionExistsById', () => {
    it('should throw NotFoundException if transaction does not exist', async () => {
      mockPrismaService.transaction.findUnique.mockResolvedValue(null);

      await expect(
        helper.validateTransactionExistsById('non-existing-id'),
      ).rejects.toThrow(
        new NotFoundException(
          `Transação com ID "non-existing-id" não encontrada.`,
        ),
      );
    });

    it('should not throw if transaction exists', async () => {
      mockPrismaService.transaction.findUnique.mockResolvedValue({
        id: 'existing-id',
      });

      await expect(
        helper.validateTransactionExistsById('existing-id'),
      ).resolves.not.toThrow();
    });
  });

  describe('validateTransaction', () => {
    beforeEach(() => {
      jest
        .spyOn(helper as any, 'validateRequiredFields')
        .mockImplementation(() => {});
      jest
        .spyOn(helper as any, 'validateTransactionValue')
        .mockImplementation(() => {});
      jest
        .spyOn(helper as any, 'validateTransactionType')
        .mockResolvedValue(undefined);
      jest
        .spyOn(helper as any, 'validateDuplicateTransaction')
        .mockResolvedValue(undefined);
    });

    it('should call all validation methods', async () => {
      await helper.validateTransaction(mockTransaction, 1);

      expect(helper['validateRequiredFields']).toHaveBeenCalledWith(
        mockTransaction,
        1,
      );
      expect(helper['validateTransactionValue']).toHaveBeenCalledWith(
        mockTransaction,
        1,
      );
      expect(helper['validateTransactionType']).toHaveBeenCalledWith(
        mockTransaction,
        1,
      );
      expect(helper['validateDuplicateTransaction']).toHaveBeenCalledWith(
        mockTransaction,
        1,
      );
    });
  });

  describe('validateRequiredFields', () => {
    it('should throw an error if fields are missing', () => {
      const invalidTransaction = { ...mockTransaction, type: null };

      expect(() =>
        helper['validateRequiredFields'](invalidTransaction, 1),
      ).toThrow(`Linha 1: Dados da transação são inválidos.`);
    });

    it('should not throw if all fields are present', () => {
      expect(() =>
        helper['validateRequiredFields'](mockTransaction, 1),
      ).not.toThrow();
    });
  });

  describe('validateTransactionValue', () => {
    it('should throw an error if value is <= 0', () => {
      const invalidTransaction = { ...mockTransaction, value: 0 };

      expect(() =>
        helper['validateTransactionValue'](invalidTransaction, 1),
      ).toThrow(`Linha 1: O valor da transação deve ser maior que zero.`);
    });

    it('should not throw if value is > 0', () => {
      expect(() =>
        helper['validateTransactionValue'](mockTransaction, 1),
      ).not.toThrow();
    });
  });

  describe('validateTransactionType', () => {
    it('should throw an error if transaction type is invalid', async () => {
      mockPrismaService.transactionType.findUnique.mockResolvedValue(null);

      await expect(
        helper['validateTransactionType'](mockTransaction, 1),
      ).rejects.toThrow(
        `Linha 1: O tipo de transação (${mockTransaction.type}) não é válido.`,
      );
    });

    it('should not throw if transaction type is valid', async () => {
      mockPrismaService.transactionType.findUnique.mockResolvedValue({ id: 1 });

      await expect(
        helper['validateTransactionType'](mockTransaction, 1),
      ).resolves.not.toThrow();
    });
  });

  describe('validateDuplicateTransaction', () => {
    it('should throw an error if transaction already exists', async () => {
      mockPrismaService.transaction.findFirst.mockResolvedValue({
        id: 'existing-id',
      });

      await expect(
        helper['validateDuplicateTransaction'](mockTransaction, 1),
      ).rejects.toThrow(`Linha 1: Transação já registrada na base de dados.`);
    });

    it('should not throw if transaction does not exist', async () => {
      mockPrismaService.transaction.findFirst.mockResolvedValue(null);

      await expect(
        helper['validateDuplicateTransaction'](mockTransaction, 1),
      ).resolves.not.toThrow();
    });
  });
});
