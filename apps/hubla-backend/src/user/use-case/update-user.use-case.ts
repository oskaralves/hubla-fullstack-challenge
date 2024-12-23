import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PasswordHelper } from '../../common/helper/password.helper';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRoleHelper } from '../helper/user-role.helper';
import { UserValidationHelper } from '../helper/user-validation.helper';
import { FindUserByIdUseCase, userInclude } from './find-user-by-id.use-case';

type PrismaUser = Prisma.UserGetPayload<{ include: typeof userInclude }>;

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userValidationHelper: UserValidationHelper,
    private readonly userRoleHelper: UserRoleHelper,
    private readonly prismaService: PrismaService,
    private readonly getUserUseCase: FindUserByIdUseCase,
  ) {}

  public async execute(
    userId: string,
    inputDto: UpdateUserDto,
  ): Promise<PrismaUser> {
    const {
      email,
      username,
      image: base64Avatar,
      coverImage: base64CoverImage,
    } = inputDto;

    await this.userValidationHelper.validateEmailAvailability(email, userId);
    await this.userValidationHelper.validateUsernameAvailability(
      username,
      userId,
    );

    const userFound = await this.getUserUseCase.execute(userId);

    const roles = await this.userRoleHelper.buildUserRoles(
      inputDto.roles,
      userFound,
    );

    if (base64Avatar) {
      // @todo: upload da image do avatar
    }
    if (base64CoverImage) {
      // @todo: upload da image do capa
    }

    inputDto.password = !!inputDto.password
      ? await PasswordHelper.hashPasswordAsync(inputDto.password)
      : undefined;

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      include: userInclude,
      data: {
        ...inputDto,
        roles,
      },
    });

    return updatedUser;
  }
}
