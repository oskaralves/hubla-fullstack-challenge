import { Prisma } from '@prisma/client';

export const transactionTypes: Prisma.TransactionTypeCreateManyInput[] = [
  {
    id: 1,
    description: 'Venda produtor',
    nature: 'INPUT',
  },
  {
    id: 2,
    description: 'Venda afiliado',
    nature: 'INPUT',
  },
  {
    id: 3,
    description: 'Comissão paga',
    nature: 'OUTPUT',
  },
  {
    id: 4,
    description: 'Comissão recebida',
    nature: 'INPUT',
  },
];
