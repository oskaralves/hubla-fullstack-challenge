import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

describe('PrismaModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();
  });

  it('should be defined', async () => {
    const prismaModule = module.get<PrismaModule>(PrismaModule);
    expect(prismaModule).toBeDefined();
  });

  it('should provide PrismaService as a global service', async () => {
    const prismaService = module.get<PrismaService>(PrismaService);
    expect(prismaService).toBeDefined();
    expect(prismaService).toBeInstanceOf(PrismaService);
  });
});
