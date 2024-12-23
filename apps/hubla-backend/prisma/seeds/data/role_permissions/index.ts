import { permissionPermissions } from './permission_permissions';
import { transactionPermissions } from './transaction_permissions';
import { transactionTypePermissions } from './transaction_type_permissions';
import { userPermissions } from './user_permissions';

export const roleAffiliatePermissions = [];

export const roleProducerPermissions = [];

export const roleAdminPermissions = [
  ...permissionPermissions,
  ...transactionPermissions,
  ...transactionTypePermissions,
  ...userPermissions,
];
