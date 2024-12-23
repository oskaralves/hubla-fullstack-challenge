import { PrismaClient, UserRoleEnum } from '@prisma/client';
import {
  roleAdminPermissions,
  roleAffiliatePermissions,
  roleProducerPermissions,
} from './data/role_permissions';
import { seedConsole } from './utils';

const context = 'ROLE PERMISSION';
const prisma = new PrismaClient();

async function rolePermissionsSeed() {
  const rolePermissions = [
    ...roleAdminPermissions.map(({ id }) => ({
      permissionId: id,
      role: UserRoleEnum.ADMIN,
    })),
    ...roleAffiliatePermissions.map(({ id }) => ({
      permissionId: id,
      role: UserRoleEnum.AFFILIATE,
    })),
    ...roleProducerPermissions.map(({ id }) => ({
      permissionId: id,
      role: UserRoleEnum.PRODUCER,
    })),
  ];

  const createdRolePermissions = await Promise.all(
    rolePermissions.map((rolePermission) =>
      prisma.rolePermission.upsert({
        where: {
          permissionId_role_unique: {
            permissionId: rolePermission.permissionId,
            role: rolePermission.role,
          },
        },
        update: {},
        create: rolePermission,
      }),
    ),
  );

  createdRolePermissions.forEach((rolePermission) =>
    seedConsole(
      context,
      `${rolePermission.permissionId} (${rolePermission.role})`,
    ),
  );
}

export const runRolePermissionsSeed = () =>
  rolePermissionsSeed()
    .then(async () => {
      seedConsole(context, `Seed completed.`);
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
