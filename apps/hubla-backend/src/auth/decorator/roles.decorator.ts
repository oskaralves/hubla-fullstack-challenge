import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '@prisma/client';

export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);
