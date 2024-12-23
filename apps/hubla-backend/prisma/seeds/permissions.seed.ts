import { PrismaClient } from '@prisma/client';

import {
  roleAdminPermissions,
  roleAffiliatePermissions,
  roleProducerPermissions,
} from './data/role_permissions';
import { seedConsole } from './utils';

const context = 'PERMISSION';
const prisma = new PrismaClient();

async function permissionsSeed() {
  const createdPermissions = await Promise.all(
    [
      ...roleAdminPermissions,
      ...roleAffiliatePermissions,
      ...roleProducerPermissions,
    ].map((permission) =>
      prisma.permission.upsert({
        where: { id: permission.id },
        update: {},
        create: permission,
      }),
    ),
  );

  createdPermissions.forEach((permission) =>
    seedConsole(context, `${permission.id} ${permission.name}`),
  );
}

export const runPermissionsSeed = () =>
  permissionsSeed()
    .then(async () => {
      seedConsole(context, `Seed completed.`);
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
