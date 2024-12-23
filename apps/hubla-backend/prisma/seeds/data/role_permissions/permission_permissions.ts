import { Prisma } from '@prisma/client';
import { PermissionPermissionEnum } from '../../../../src/permission/enum/permission-permission.enum';

export const permissionPermissions: Prisma.PermissionCreateManyInput[] = [
  {
    id: '331a4fdf-d97a-42d2-a97c-c047314fd6f2',
    name: PermissionPermissionEnum.CREATE,
    description: 'Criar permissões',
  },
  {
    id: '129b1718-b657-436d-9360-018089a483cc',
    name: PermissionPermissionEnum.READ,
    description: 'Ler permissões',
  },
  {
    id: 'ceb857bc-ca04-47df-bb48-cfc57161979b',
    name: PermissionPermissionEnum.UPDATE,
    description: 'Atualizar permissões',
  },
  {
    id: '33257ac6-ba9a-45c6-9025-e634273d24d1',
    name: PermissionPermissionEnum.DELETE,
    description: 'Remover permissões',
  },
];
