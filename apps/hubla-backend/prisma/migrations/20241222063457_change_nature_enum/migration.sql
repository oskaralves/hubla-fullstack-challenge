/*
  Warnings:

  - The values [INCOME,EXPENSE] on the enum `TransactionNatureEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."TransactionNatureEnum_new" AS ENUM ('INPUT', 'OUTPUT');
ALTER TABLE "public"."transaction_types" ALTER COLUMN "nature" TYPE "public"."TransactionNatureEnum_new" USING ("nature"::text::"public"."TransactionNatureEnum_new");
ALTER TYPE "public"."TransactionNatureEnum" RENAME TO "TransactionNatureEnum_old";
ALTER TYPE "public"."TransactionNatureEnum_new" RENAME TO "TransactionNatureEnum";
DROP TYPE "public"."TransactionNatureEnum_old";
COMMIT;
