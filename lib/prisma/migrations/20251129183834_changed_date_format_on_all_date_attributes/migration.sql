-- AlterTable
ALTER TABLE "Administrator" ALTER COLUMN "assignedAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Community" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "startsAt" SET DATA TYPE DATE,
ALTER COLUMN "endsAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Moderator" ALTER COLUMN "assignedAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "createdAt" SET DATA TYPE DATE;
