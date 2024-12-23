import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from '../../common/enum/permission.enum';

export const Permissions = (...permissions: PermissionsEnum[]) =>
  SetMetadata('permissions', permissions);
