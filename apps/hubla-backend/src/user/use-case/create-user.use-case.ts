import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PasswordHelper } from '../../common/helper/password.helper';
import { SlugHelper } from '../../common/helper/slug.helper';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRoleHelper } from '../helper/user-role.helper';
import { UserValidationHelper } from '../helper/user-validation.helper';
import { userInclude } from './find-user-by-id.use-case';

type PrismaUser = Prisma.UserGetPayload<{ include: typeof userInclude }>;

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRoleHelper: UserRoleHelper,
    private readonly userValidationHelper: UserValidationHelper,
    private readonly prismaService: PrismaService,
  ) {}

  public async execute(inputDto: CreateUserDto): Promise<PrismaUser> {
    const { email, name, nickname, username } = inputDto;

    await this.userValidationHelper.validateEmailAvailability(email);

    const slugBase = SlugHelper.createSlug(username || nickname || name);
    const existingSlugs = (
      await this.prismaService.user.findMany({
        select: { username: true },
        where: { username: { startsWith: slugBase } },
      })
    ).map((item) => item.username);

    const uniqueSlug = SlugHelper.generateUniqueSlug(slugBase, existingSlugs);

    const password = await PasswordHelper.hashPasswordAsync(inputDto.password);

    const roles = await this.userRoleHelper.buildUserRoles(inputDto.roles);

    const createdUser = await this.prismaService.user.create({
      include: userInclude,
      data: {
        ...inputDto,
        username: uniqueSlug,
        password,
        roles,
      },
    });

    // const code = CodeHelper.generateRandomNumber();
    // @todo: save on code in redis to 'email-confirmation'
    // @todo: send to queue to send mail

    return createdUser;
  }
}
