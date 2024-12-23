import { PermissionPermissionEnum } from '../../permission/enum/permission-permission.enum';
import { RolePermissionEnum } from '../../role/enum/role-permission.enum';
import { TransactionTypePermissionEnum } from '../../transaction-type/enum/transaction-type-permission.enum';
import { TransactionPermissionEnum } from '../../transaction/enum/transaction-permission.enum';
import { UserPermissionEnum } from '../../user/enum/user-permission.enum';

export type PermissionsEnum =
  | TransactionPermissionEnum
  | TransactionTypePermissionEnum
  | RolePermissionEnum
  | UserPermissionEnum
  | PermissionPermissionEnum;
