import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserValidationHelper } from '../helper/user-validation.helper';

export const userInclude: Prisma.UserDefaultArgs['include'] = {
  roles: true,
};

type PrismaUser = Prisma.UserGetPayload<{ include: typeof userInclude }>;

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    private readonly userValidationHelper: UserValidationHelper,
    private readonly prismaService: PrismaService,
  ) {}

  async execute(id: string, include?: Prisma.UserInclude): Promise<PrismaUser> {
    await this.userValidationHelper.validateUserExistsById(id);
    return this.prismaService.user.findUnique({
      where: { id },
      include: include || userInclude,
    });
  }
}
