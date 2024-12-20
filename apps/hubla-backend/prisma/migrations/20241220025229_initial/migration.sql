-- CreateEnum
CREATE TYPE "public"."TransactionNatureEnum" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "public"."transaction_types" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "nature" "public"."TransactionNatureEnum" NOT NULL,
    "sign" TEXT NOT NULL,

    CONSTRAINT "transaction_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transactions" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "product" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "seller" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_types_description_key" ON "public"."transaction_types"("description");

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_type_fkey" FOREIGN KEY ("type") REFERENCES "public"."transaction_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
