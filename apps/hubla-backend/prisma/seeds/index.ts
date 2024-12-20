import { runTransactionTypeSeed } from './transaction_type.seed';

async function runSeeds() {
  await runTransactionTypeSeed();
}

runSeeds();
