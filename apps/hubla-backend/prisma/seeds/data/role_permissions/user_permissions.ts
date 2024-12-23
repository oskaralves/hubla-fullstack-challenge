import { Prisma } from '@prisma/client';
import { UserPermissionEnum } from '../../../../src/user/enum/user-permission.enum';

export const userPermissions: Prisma.PermissionCreateManyInput[] = [
  {
    id: '34b6db00-83c3-42d4-9e3d-ac35ea0fb4fd',
    name: UserPermissionEnum.CREATE,
    description: 'Criar usuários',
  },
  {
    id: 'aa90e3c7-c78e-47ac-a764-4657578f98b4',
    name: UserPermissionEnum.READ,
    description: 'Ler usuários',
  },
  {
    id: '45e0733e-f0f4-4ab6-9c58-97ab1d2994f4',
    name: UserPermissionEnum.UPDATE,
    description: 'Atualizar usuários',
  },
  {
    id: 'c7253e37-a900-41ca-b4f4-d321197f39b4',
    name: UserPermissionEnum.DELETE,
    description: 'Remover usuários',
  },
];
