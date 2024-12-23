import { Prisma } from '@prisma/client';
import { TransactionPermissionEnum } from '../../../../src/transaction/enum/transaction-permission.enum';

export const transactionPermissions: Prisma.PermissionCreateManyInput[] = [
  {
    id: 'ed657b11-3482-4495-846d-1afb7e8cc43e',
    name: TransactionPermissionEnum.CREATE,
    description: 'Criar transação',
  },
  {
    id: '87eff210-8532-452e-ae56-09e20bd99e49',
    name: TransactionPermissionEnum.READ,
    description: 'Ler transação',
  },
  {
    id: '518752ba-f019-4d7a-a8c0-865026672976',
    name: TransactionPermissionEnum.UPDATE,
    description: 'Atualizar transação',
  },
  {
    id: '48cbfac1-ec70-4d0b-bf19-250e33a1cd46',
    name: TransactionPermissionEnum.DELETE,
    description: 'Remover transação',
  },
];
