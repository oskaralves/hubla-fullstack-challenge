import { Prisma } from '@prisma/client';

export const transactionTypes: Prisma.TransactionTypeCreateManyInput[] = [
  {
    id: 1,
    description: 'Venda produtor',
    nature: 'INCOME',
  },
  {
    id: 2,
    description: 'Venda afiliado',
    nature: 'INCOME',
  },
  {
    id: 3,
    description: 'Comissão paga',
    nature: 'EXPENSE',
  },
  {
    id: 4,
    description: 'Comissão recebida',
    nature: 'INCOME',
  },
];
