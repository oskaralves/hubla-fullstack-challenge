import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TransactionValidationHelper {
  constructor(private readonly prismaService: PrismaService) {}

  async validateTransactionExistsById(id: string): Promise<void> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction com ID "${id}" não encontrada.`);
    }
  }
}
