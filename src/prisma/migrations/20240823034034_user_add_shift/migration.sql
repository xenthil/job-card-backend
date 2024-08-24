/*
  Warnings:

  - Added the required column `shif_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "shif_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_shif_id_fkey" FOREIGN KEY ("shif_id") REFERENCES "shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
