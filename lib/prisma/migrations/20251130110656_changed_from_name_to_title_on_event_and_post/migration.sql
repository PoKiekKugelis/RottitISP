/*
  Warnings:

  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Event_name_key";

-- DropIndex
DROP INDEX "public"."Post_name_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_title_key" ON "Event"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
