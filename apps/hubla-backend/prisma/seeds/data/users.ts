import { Prisma } from '@prisma/client';

export const users: Partial<Prisma.UserCreateManyInput>[] = [
  {
    id: '4c6c9d94-c4bd-48c4-b321-c26810f1786f',
    email: 'osk.alves@gmail.com',
    emailVerified: new Date(),
    name: 'Oscar Alves',
    username: 'admin',
  },
  {
    id: '53f5b5f6-a783-4a3f-9298-1c26b5963255',
    email: 'osk.alves+affiliated@gmail.com',
    emailVerified: new Date(),
    name: 'Oscar Filiado',
    username: 'oscar-affiliated',
  },
  {
    id: 'cf170abe-853f-4efe-be7c-c88b5c1bbb64',
    email: 'osk.alves+producer@gmail.com',
    name: 'Oscar Produtor',
    username: 'oscar-producer',
  },
];
