import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class TransactionValidationHelper {
  constructor(private readonly prismaService: PrismaService) {}

  async validateTransactionExistsById(id: string): Promise<void> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!transaction) {
      throw new NotFoundException(`Transação com ID "${id}" não encontrada.`);
    }
  }

  async validateTransaction(
    transaction: CreateTransactionDto,
    lineNumber: number,
  ): Promise<void> {
    this.validateRequiredFields(transaction, lineNumber);
    this.validateTransactionValue(transaction, lineNumber);
    await this.validateTransactionType(transaction, lineNumber);
    await this.validateDuplicateTransaction(transaction, lineNumber);
  }

  private validateRequiredFields(
    transaction: CreateTransactionDto,
    lineNumber: number,
  ): void {
    const { type, date, product, value, seller } = transaction;

    if (!type || !date || !product || !value || !seller) {
      throw new Error(`Linha ${lineNumber}: Dados da transação são inválidos.`);
    }
  }

  private validateTransactionValue(
    transaction: CreateTransactionDto,
    lineNumber: number,
  ): void {
    if (transaction.value <= 0) {
      throw new Error(
        `Linha ${lineNumber}: O valor da transação deve ser maior que zero.`,
      );
    }
  }

  private async validateTransactionType(
    transaction: CreateTransactionDto,
    lineNumber: number,
  ): Promise<void> {
    const transactionTypeExists =
      await this.prismaService.transactionType.findUnique({
        where: { id: transaction.type },
      });

    if (!transactionTypeExists) {
      throw new Error(
        `Linha ${lineNumber}: O tipo de transação (${transaction.type}) não é válido.`,
      );
    }
  }

  private async validateDuplicateTransaction(
    transaction: CreateTransactionDto,
    lineNumber: number,
  ): Promise<void> {
    const exists = await this.prismaService.transaction.findFirst({
      where: {
        type: transaction.type,
        date: transaction.date,
        product: transaction.product,
        value: transaction.value,
        seller: transaction.seller,
      },
    });

    if (exists) {
      throw new Error(
        `Linha ${lineNumber}: Transação já registrada na base de dados.`,
      );
    }
  }
}
