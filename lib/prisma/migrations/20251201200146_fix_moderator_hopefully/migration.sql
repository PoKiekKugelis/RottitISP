/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `Moderator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Moderator` table. All the data in the column will be lost.
  - Added the required column `creatorCommunityId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorUserId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Moderator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_creatorId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "creatorId",
ADD COLUMN     "creatorCommunityId" INTEGER NOT NULL,
ADD COLUMN     "creatorUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Moderator" DROP CONSTRAINT "Moderator_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Moderator_pkey" PRIMARY KEY ("userId", "communityId");

-- AddForeignKey
ALTER TABLE "Moderator" ADD CONSTRAINT "Moderator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_creatorUserId_creatorCommunityId_fkey" FOREIGN KEY ("creatorUserId", "creatorCommunityId") REFERENCES "Moderator"("userId", "communityId") ON DELETE RESTRICT ON UPDATE CASCADE;
