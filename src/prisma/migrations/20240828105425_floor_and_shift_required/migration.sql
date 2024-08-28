/*
  Warnings:

  - Made the column `shift_id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `floor_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_floor_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_shift_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "shift_id" SET NOT NULL,
ALTER COLUMN "floor_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
