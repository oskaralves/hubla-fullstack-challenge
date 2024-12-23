import { Injectable } from '@nestjs/common';
import { Prisma, UserRoleEnum } from '@prisma/client';

@Injectable()
export class UserRoleHelper {
  async buildUserRoles(
    roles: string[] = [],
    userFound?: Prisma.UserGetPayload<{ include: { roles: true } }>,
  ): Promise<Prisma.UserRoleUpdateManyWithoutUserNestedInput> | undefined {
    const validRoles = roles.filter((role) =>
      Object.values(UserRoleEnum).includes(role as UserRoleEnum),
    );

    const rolesToCreate = !!validRoles.length
      ? validRoles
      : [UserRoleEnum.AFFILIATE];

    const rolesInput: Prisma.UserRoleCreateNestedManyWithoutUserInput = {
      create: rolesToCreate.map((role) => ({ role })),
    };

    if (!!userFound?.roles?.length) {
      return {
        ...rolesInput,
        deleteMany: userFound.roles.map((userRole) => ({ id: userRole.id })),
      };
    }

    return rolesInput;
  }
}
