import { PrismaClient } from '@prisma/client';
import { transactionTypes } from './data/transaction_types';
import { seedConsole } from './utils';

const context = 'TRANSACTION_TYPE';
const prisma = new PrismaClient();

async function transactionTypeSeed() {
  const createdTransactionTypes = await Promise.all(
    transactionTypes.map((type) =>
      prisma.transactionType.upsert({
        where: { id: type.id },
        update: {},
        create: type,
      }),
    ),
  );

  return createdTransactionTypes;
}

export const runTransactionTypeSeed = () =>
  transactionTypeSeed()
    .then(async (types) => {
      types.forEach((type) => {
        seedConsole(
          context,
          `ID: ${type.id} | ${type.description} (${type.nature}, ${type.nature === 'INCOME' ? '+' : '-'})`,
        );
      });
      seedConsole(context, `Seed completed.`);
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
