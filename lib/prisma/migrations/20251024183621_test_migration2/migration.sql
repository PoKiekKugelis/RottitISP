/*
  Warnings:

  - You are about to drop the column `text` on the `Test` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "text",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Test_email_key" ON "Test"("email");
