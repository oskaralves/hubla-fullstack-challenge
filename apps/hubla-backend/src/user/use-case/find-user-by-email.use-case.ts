import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserValidationHelper } from '../helper/user-validation.helper';
import { userInclude } from './find-user-by-id.use-case';

type PrismaUser = Prisma.UserGetPayload<{ include: typeof userInclude }>;

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    private readonly userValidationHelper: UserValidationHelper,
    private readonly prismaService: PrismaService,
  ) {}

  async execute(
    email: string,
    include?: Prisma.UserInclude,
  ): Promise<PrismaUser> {
    await this.userValidationHelper.validateUserExistsByEmail(email);
    return this.prismaService.user.findUnique({
      where: { email },
      include: include || userInclude,
    });
  }
}
