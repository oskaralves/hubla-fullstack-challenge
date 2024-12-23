import { runPermissionsSeed } from './permissions.seed';
import { runRolePermissionsSeed } from './role-permissions.seed';
import { runTransactionTypeSeed } from './transaction-type.seed';
import { runUsersSeed } from './users.seed';

async function runSeeds() {
  await runPermissionsSeed();
  await runRolePermissionsSeed();
  await runTransactionTypeSeed();

  await runUsersSeed();
}

runSeeds();
