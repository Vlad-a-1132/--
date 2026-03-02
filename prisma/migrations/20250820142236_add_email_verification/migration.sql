-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerificationCode" TEXT,
ADD COLUMN     "emailVerificationExpires" TIMESTAMP(3),
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isActive" SET DEFAULT false;
