import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from '@prisma/client';
import { PermissionsEnum } from '../../common/enum/permission.enum.js';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthRequestDto } from '../dto/auth-request.dto.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const reflector = this.reflector.get;
    const roles: UserRoleEnum[] = reflector('roles', context.getHandler());
    const permissions: PermissionsEnum[] = reflector(
      'permissions',
      context.getHandler(),
    );

    if (!roles && !permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequestDto>();

    const userId = request?.user?.id;

    if (userId) {
      const userRoles = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { roles: { select: { role: true } } },
      });

      const userRoleNames = userRoles.roles.map(({ role }) => role);

      if (userRoleNames.includes('ADMIN')) {
        return true;
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          roles: {
            select: {
              role: true,
            },
          },
        },
      });

      const rolePermissions = await Promise.all(
        user.roles.map(async ({ role }) => {
          const permissions = await this.prisma.rolePermission.findMany({
            where: { role },
            select: { permission: { select: { name: true } } },
          });
          return permissions.map(({ permission }) => permission.name);
        }),
      );

      const userPermissionsNames = rolePermissions.flat();

      const hasRequiredRole = userRoles.roles.map((role) =>
        userRoleNames.includes(role.role),
      );

      const hasRequiredPermission = permissions.some((role) =>
        userPermissionsNames.includes(role),
      );

      if (hasRequiredRole && hasRequiredPermission) {
        return true;
      }

      throw new ForbiddenException(
        `Unauthorized to access the resource "${request.path}". [${permissions}] permission required.`,
      );
    }
    return false;
  }
}
