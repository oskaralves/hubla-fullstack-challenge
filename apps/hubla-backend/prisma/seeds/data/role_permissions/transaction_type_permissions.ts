import { Prisma } from '@prisma/client';
import { TransactionTypePermissionEnum } from '../../../../src/transaction-type/enum/transaction-type-permission.enum';

export const transactionTypePermissions: Prisma.PermissionCreateManyInput[] = [
  {
    id: 'af42ed94-69f2-48c2-98b9-936a634a2d92',
    name: TransactionTypePermissionEnum.CREATE,
    description: 'Criar tipo de transação',
  },
  {
    id: '5c1ec881-db32-478e-9e1c-e6c24a5d35ac',
    name: TransactionTypePermissionEnum.READ,
    description: 'Ler tipo de transação',
  },
  {
    id: '8aa90868-fa9e-429a-818e-067a5bd04263',
    name: TransactionTypePermissionEnum.UPDATE,
    description: 'Atualizar tipo de transação',
  },
  {
    id: 'a147d019-ea76-4117-8f67-e54a58493235',
    name: TransactionTypePermissionEnum.DELETE,
    description: 'Remover tipo de transação',
  },
];
