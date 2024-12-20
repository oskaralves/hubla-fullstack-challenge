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
  ): Promise<string | null> {
    const errors = [
      this.validateRequiredFields(transaction, lineNumber),
      this.validateTransactionValue(transaction, lineNumber),
      await this.validateTransactionType(transaction, lineNumber),
      await this.validateDuplicateTransaction(transaction, lineNumber),
    ].filter((error) => error !== null);

    if (errors.length > 0) {
      return errors.join(' ');
    }

    return null;
  }

  private validateRequiredFields(
    transaction: CreateTransactionDto,
    lineNumber: number,
  ): string | null {
    const { type, date, product, value, seller } = transaction;

    if (!type || !date || !product || !value || !seller) {
      return `Linha ${lineNumber}: Dados da transação são inválidos.`;
    }

    return null;
  }

  private validateTransactionValue(
    transaction: CreateTransactionDto,
    lineNumber: number,
  ): string | null {
    if (transaction.value <= 0) {
      return `Linha ${lineNumber}: O valor da transação deve ser maior que zero.`;
    }

    return null;
  }

  private async validateTransactionType(
    transaction: CreateTransactionDto,
    lineNumber: number,
  ): Promise<string | null> {
    const transactionTypeExists =
      await this.prismaService.transactionType.findUnique({
        where: { id: transaction.type },
      });

    if (!transactionTypeExists) {
      return `Linha ${lineNumber}: O tipo de transação (${transaction.type}) não é válido.`;
    }

    return null;
  }

  private async validateDuplicateTransaction(
    transaction: CreateTransactionDto,
    lineNumber: number,
  ): Promise<string | null> {
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
      return `Linha ${lineNumber}: Transação já registrada na base de dados.`;
    }

    return null;
  }
}
