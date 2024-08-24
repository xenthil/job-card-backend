/*
  Warnings:

  - You are about to drop the column `shif_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `shift_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_shif_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "shif_id",
ADD COLUMN     "shift_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
