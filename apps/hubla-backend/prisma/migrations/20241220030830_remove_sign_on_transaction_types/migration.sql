/*
  Warnings:

  - You are about to drop the column `sign` on the `transaction_types` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."transaction_types" DROP COLUMN "sign";
