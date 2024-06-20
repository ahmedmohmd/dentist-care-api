-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileImage" DROP NOT NULL,
ALTER COLUMN "profileImage" DROP DEFAULT,
ALTER COLUMN "profileImagePublicId" DROP NOT NULL,
ALTER COLUMN "profileImagePublicId" DROP DEFAULT;
