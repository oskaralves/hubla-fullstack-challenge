/*
  Warnings:

  - The values [CUSTOMER,MERCHANT] on the enum `UserRoleEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."UserRoleEnum_new" AS ENUM ('ADMIN', 'AFFILIATE', 'PRODUCER');
ALTER TABLE "public"."users_roles" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."users_roles" ALTER COLUMN "role" TYPE "public"."UserRoleEnum_new" USING ("role"::text::"public"."UserRoleEnum_new");
ALTER TABLE "public"."role_permissions" ALTER COLUMN "role" TYPE "public"."UserRoleEnum_new" USING ("role"::text::"public"."UserRoleEnum_new");
ALTER TYPE "public"."UserRoleEnum" RENAME TO "UserRoleEnum_old";
ALTER TYPE "public"."UserRoleEnum_new" RENAME TO "UserRoleEnum";
DROP TYPE "public"."UserRoleEnum_old";
ALTER TABLE "public"."users_roles" ALTER COLUMN "role" SET DEFAULT 'AFFILIATE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."users_roles" ALTER COLUMN "role" SET DEFAULT 'AFFILIATE';
