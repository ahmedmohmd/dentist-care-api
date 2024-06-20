/*
  Warnings:

  - You are about to drop the column `address` on the `Checkup` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Checkup` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Checkup` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Checkup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Checkup" DROP COLUMN "address",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phoneNumber";
