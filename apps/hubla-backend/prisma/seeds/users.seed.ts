import { Prisma, UserRoleEnum } from '@prisma/client';
import { PasswordHelper } from '../../src/common/helper/password.helper';
import { PrismaService } from '../../src/prisma/prisma.service';
import { users } from './data/users';
import { seedConsole } from './utils';

const context = 'USER';
const prisma = new PrismaService();

async function usersSeed() {
  const password = 'Abcd123!';

  const admin = await prisma.user.upsert({
    where: { email: users[0].email },
    select: { id: true, name: true, roles: true },
    update: {},
    create: {
      ...(users[0] as Prisma.UserCreateManyInput),
      emailVerified: new Date(),
      password: await PasswordHelper.hashPasswordAsync(password),
      roles: { create: [{ role: UserRoleEnum.ADMIN }] },
    },
  });

  const affiliated = await prisma.user.upsert({
    where: { email: users[1].email },
    select: { id: true, name: true, roles: true },
    update: {},
    create: {
      ...(users[1] as Prisma.UserCreateManyInput),
      emailVerified: new Date(),
      password: await PasswordHelper.hashPasswordAsync(password),
      roles: { create: [{ role: UserRoleEnum.AFFILIATE }] },
    },
  });

  const producer = await prisma.user.upsert({
    where: { email: users[2].email },
    select: { id: true, name: true, roles: true },
    update: {},
    create: {
      ...(users[2] as Prisma.UserCreateManyInput),
      emailVerified: new Date(),
      password: await PasswordHelper.hashPasswordAsync(password),
      roles: { create: [{ role: UserRoleEnum.PRODUCER }] },
    },
  });

  [admin, affiliated, producer].forEach((user) => {
    seedConsole(
      context,
      `${user.id} ${user.name} (${user.roles
        .map((role) => role.role)
        .join(', ')})`,
    );
  });
}

export const runUsersSeed = () =>
  usersSeed()
    .then(async () => {
      seedConsole(context, `Seed completed.`);
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
